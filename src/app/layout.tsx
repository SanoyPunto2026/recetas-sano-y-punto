import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Bóveda de Recetas | Sano y Punto",
  description: "Tu bóveda exclusiva de recetas saludables. Airfryer, sin gluten, cocina mediterránea y más. Acceso de por vida por solo $10 USD.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-outfit)]">{children}</body>
    </html>
  );
}
