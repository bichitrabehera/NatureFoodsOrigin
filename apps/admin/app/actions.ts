"use server";

import { cookies } from "next/headers";
import { eq, desc, and, like, sql, inArray } from "drizzle-orm";
import { getDb } from "@naturefoods/shared";
import { orders, orderItems } from "@naturefoods/shared";
import nodemailer from "nodemailer";

function unauthorized() {
  return { error: "Unauthorized" };
}

function dbError(err: unknown) {
  console.error("DB error:", err);
  return { error: "Database connection failed." };
}

function formatCurrency(amount: string | number) {
  const num = Number(amount);
  return `Rs ${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function checkAuth() {
  const store = await cookies();
  return store.get("admin_session")?.value === "authenticated";
}

export async function getOrders(
  search?: string,
  status?: string,
  page?: number,
) {
  try {
    if (!(await checkAuth())) return unauthorized();
    const db = getDb();
    const conditions: any[] = [];

    if (search) conditions.push(like(orders.orderNumber, `%${search}%`));
    if (status) conditions.push(eq(orders.status, status as any));

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const pageSize = 20;
    const currentPage = page || 1;
    const offset = (currentPage - 1) * pageSize;

    const [totalResult] = await db
      .select({ count: sql<number>`CAST(count(*) AS integer)` })
      .from(orders)
      .where(where);

    const result = await db
      .select()
      .from(orders)
      .where(where)
      .orderBy(desc(orders.createdAt))
      .limit(pageSize)
      .offset(offset);

    const orderIds = result.map((o) => o.id);
    let itemCounts: Record<number, number> = {};
    if (orderIds.length > 0) {
      const items = await db
        .select({
          orderId: orderItems.orderId,
          count: sql<number>`CAST(count(*) AS integer)`,
        })
        .from(orderItems)
        .where(inArray(orderItems.orderId, orderIds))
        .groupBy(orderItems.orderId);
      itemCounts = Object.fromEntries(items.map((i) => [i.orderId, i.count]));
    }

    return {
      orders: result.map((o) => ({
        ...o,
        itemCount: itemCounts[o.id] || 0,
      })),
      total: Number(totalResult.count),
    };
  } catch (err) {
    return dbError(err);
  }
}

export async function getOrderById(orderId: number) {
  try {
    if (!(await checkAuth())) return unauthorized();
    const db = getDb();

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));

    if (!order) return { error: "Order not found" };

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    return { order, items };
  } catch (err) {
    return dbError(err);
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    if (!(await checkAuth())) return unauthorized();
    const db = getDb();

    await db
      .update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, orderId));

    return { success: true };
  } catch (err) {
    return dbError(err);
  }
}

export async function getOrderStats() {
  try {
    if (!(await checkAuth())) return unauthorized();
    const db = getDb();
    const allOrders = await db.select().from(orders);

    const total = allOrders.length;
    const byStatus: Record<string, number> = {};
    for (const o of allOrders) {
      byStatus[o.status] = (byStatus[o.status] || 0) + 1;
    }

    return {
      total,
      byStatus,
      today: allOrders.filter(
        (o) =>
          new Date(o.createdAt).toDateString() === new Date().toDateString(),
      ).length,
    };
  } catch (err) {
    return dbError(err);
  }
}

export async function sendReceipt(orderId: number) {
  try {
    if (!(await checkAuth())) return { error: "Unauthorized" };
    const db = getDb();

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));

    if (!order) return { error: "Order not found" };
    if (!order.customerEmail)
      return { error: "No customer email on this order" };

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    const subtotal = Number(order.subtotal);
    const gstAmount = Number(order.gstAmount);
    const total = Number(order.totalAmount);

    const itemRows = items
      .map(
        (item) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${item.productName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${formatCurrency(item.unitPrice)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${formatCurrency(Number(item.unitPrice) * item.quantity)}</td>
        </tr>`,
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Inter,system-ui,sans-serif;color:#1a1a1a;background:#f9fafb;margin:0;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden">
    <div style="padding:24px;border-bottom:1px solid #e5e7eb">
      <h1 style="margin:0;font-size:20px;color:#16a34a">Nature Food Origin</h1>
      <p style="margin:4px 0 0;font-size:14px;color:#6b7280">Order Receipt</p>
    </div>
    <div style="padding:24px">
      <p style="margin:0 0 4px;font-size:14px;color:#6b7280">Order #</p>
      <p style="margin:0 0 16px;font-size:16px;font-weight:600">${order.orderNumber}</p>

      <p style="margin:0 0 4px;font-size:14px;color:#6b7280">Date</p>
      <p style="margin:0 0 16px;font-size:14px">${formatDate(order.createdAt)}</p>

      <p style="margin:0 0 4px;font-size:14px;color:#6b7280">Customer</p>
      <p style="margin:0 0 4px;font-size:14px;font-weight:500">${order.customerName}</p>
      <p style="margin:0 0 4px;font-size:14px">${order.customerPhone}</p>
      <p style="margin:0 0 16px;font-size:14px">${order.customerEmail}${order.address ? `<br>${order.address}` : ""}${order.pincode ? ` - ${order.pincode}` : ""}</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
        <thead>
          <tr style="background:#f9fafb">
            <th style="padding:8px 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;text-align:left">Item</th>
            <th style="padding:8px 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;text-align:center">Qty</th>
            <th style="padding:8px 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;text-align:right">Price</th>
            <th style="padding:8px 12px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;text-align:right">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <div style="border-top:1px solid #e5e7eb;padding-top:12px">
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px">
          <span style="color:#6b7280">Subtotal</span>
          <span>${formatCurrency(subtotal)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px">
          <span style="color:#6b7280">GST (${order.gstRate}%)</span>
          <span>${formatCurrency(gstAmount)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:600;margin-top:8px;padding-top:8px;border-top:1px solid #e5e7eb">
          <span>Total</span>
          <span>${formatCurrency(total)}</span>
        </div>
      </div>

      <p style="margin:24px 0 0;font-size:12px;color:#6b7280;text-align:center">Thank you for your order!</p>
    </div>
  </div>
</body>
</html>`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@naturefoodsorigin.com",
      to: order.customerEmail,
      subject: `Receipt - ${order.orderNumber}`,
      html,
    });

    return { success: true };
  } catch (err) {
    console.error("sendReceipt error:", err);
    return { error: "Failed to send receipt. Check SMTP configuration." };
  }
}
