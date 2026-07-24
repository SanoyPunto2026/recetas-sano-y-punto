import type { Metadata } from "next";
import { Outfit, DM_Serif_Display, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: 'swap',
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
      className={`${outfit.variable} ${dmSerif.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fast.wistia.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fast.wistia.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://embed-ssl.wistia.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-[var(--font-outfit)]">{children}</body>
    </html>
  );
}
