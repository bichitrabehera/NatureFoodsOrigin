import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminShell from "@/components/layout/admin-shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFO Admin",
  description: "Nature Food Origin admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-text antialiased`}>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
