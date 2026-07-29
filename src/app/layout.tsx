import type { Metadata } from "next";
import { Outfit, DM_Serif_Display, Montserrat } from "next/font/google";
import Script from "next/script";
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xu5siesuh9");
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-[var(--font-outfit)]">{children}</body>
    </html>
  );
}
