"use server";

import { getDb } from "@naturefoods/shared";
import { orders, orderItems } from "@naturefoods/shared";

const GST_RATE = "5.00";

interface OrderItemInput {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface CreateOrderInput {
  items: OrderItemInput[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address?: string;
  pincode?: string;
  notes?: string;
  subtotal: number;
  latitude?: string;
  longitude?: string;
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NFO-${timestamp}${random}`;
}

export async function createOrder(input: CreateOrderInput) {
  try {
    const db = getDb();
    const orderNumber = generateOrderNumber();

    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail,
        address: input.address,
        pincode: input.pincode,
        notes: input.notes,
        latitude: input.latitude,
        longitude: input.longitude,
        subtotal: input.subtotal.toFixed(2),
        gstAmount: (input.subtotal * 0.05).toFixed(2),
        gstRate: GST_RATE,
        totalAmount: (input.subtotal * 1.05).toFixed(2),
        status: "pending",
        paymentMethod: "simulated",
        paymentStatus: "paid",
      })
      .returning({ id: orders.id, orderNumber: orders.orderNumber });

    for (const item of input.items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId ? Number(item.productId) : null,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toFixed(2),
      });
    }

    return { success: true, orderNumber: order.orderNumber };
  } catch (err) {
    console.error("Order creation failed:", err);
    return { error: "Failed to create order. Please check your database connection." };
  }
}
