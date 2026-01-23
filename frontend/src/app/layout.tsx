import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "حَصِين الذكي | Haseen-AI - المنظومة المؤسسية المنيعة لوكلاء البرمجيات الذاتية",
  description: "بيئة تشغيل محصنة ومتينة لوكلاء هندسة البرمجيات طويلي المدى مع نقاط فحص مشفرة واستئناف فوري عند الانهيار (Durable Runtime for Long-Horizon Agents)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-[#030712] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
