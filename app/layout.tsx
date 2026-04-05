import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "CustomTee - T-Shirt Customizer",
  description: "Design your own custom T-shirts with our interactive designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
