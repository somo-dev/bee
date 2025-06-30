import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComponentsNav } from "@/components/layout/ComponentsNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bee UI - Build beautiful UIs faster with our AI-powered library",
  description:
    "Streamline your development workflow with our optimized UI components. Install, copy, deploy — it's that simple.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex">
          <ComponentsNav />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
