import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursorWrapper from "@/components/CustomCursorWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://allthingsmedtech.com"),
  title: {
    default: "All Things MedTech | The Global MedTech Directory",
    template: "%s | All Things MedTech",
  },
  description:
    "Connecting medical device innovators with trusted industry partners. Discover 7,000+ verified suppliers, contract manufacturers, and service providers.",
  keywords: [
    "medtech",
    "medical devices",
    "supplier directory",
    "FDA",
    "biomedical engineering",
    "medical hardware",
    "contract manufacturing",
    "ISO 13485",
  ],
  openGraph: {
    title: "All Things MedTech",
    description:
      "The Global MedTech Directory — Connecting Engineers to the Supply Chain of the Future",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bone min-h-screen relative font-sans text-ink selection:bg-retro-orange selection:text-white cursor-none">
        {/* Grain Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <CustomCursorWrapper />
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
