import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Glenbrook 225 - Community Portal",
  description: "Public meeting portal for Glenbrook High School District 225",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="atlas-light">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
          <div className="flex gap-6">
            <main className="flex-1 min-w-0">{children}</main>
            <Sidebar />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
