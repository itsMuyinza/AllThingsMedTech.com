import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://allthingsmedtech.com"),
  title: {
    default: "AllThingsMedTech | The Future Supply Chain",
    template: "%s | AllThingsMedTech",
  },
  description:
    "The #1 database for medical hardware. Connecting engineers to 7,000+ verified suppliers, contract manufacturers, and component providers.",
  keywords: [
    "medtech",
    "medical devices",
    "supplier directory",
    "FDA",
    "biomedical engineering",
    "medical hardware",
  ],
  openGraph: {
    title: "AllThingsMedTech",
    description:
      "Connecting Engineers to the Supply Chain of the Future",
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
      <body>
        <div className="min-h-screen relative overflow-hidden flex flex-col">
          <div className="grid-bg"></div>
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
