import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/lib/context/cart-context";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Nature Food Origin — Fresh, Healthy, Made Daily",
  description:
    "Handcrafted meals using the freshest organic ingredients. Wholesome, delicious, and made just for you.",
}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-text antialiased">
        <CartProvider>
          <Navbar/>
          {children}
          <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
