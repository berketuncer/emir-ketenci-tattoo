import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist_Mono, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import QuickContact from "@/components/layout/QuickContact";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import { site } from "@/data/site";
import { localBusinessSchema } from "@/lib/seo";
import "./globals.css";

// Tasarımda yalnızca tek ağırlık kullanılıyor; sabit kesit değişken fontun
// yarısından küçük olduğu için ağırlık burada sabitlenir.
const display = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Arayüzde yalnızca 400 ve 500 kullanılıyor.
const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500"],
});

// Etiket tipografisi ikincil; kritik yolu şişirmemesi için ön yükleme kapalı.
const mono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Dövme ve Tasarım Stüdyosu · İstanbul`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dövme",
    "tattoo",
    "İstanbul dövme stüdyosu",
    "fine line dövme",
    "blackwork",
    "realizm dövme",
    "kişiye özel dövme tasarımı",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Tattoo Studio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Dövme ve Tasarım Stüdyosu · İstanbul`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} dövme stüdyosu` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Dövme ve Tasarım Stüdyosu · İstanbul`,
    description: site.shortDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-ink text-bone">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // schema.org verisi statik ve güvenilir; kullanıcı girdisi içermez.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          İçeriğe geç
        </a>
        <ScrollProgress />
        <Header />
        <main id="icerik" className="relative">
          {children}
        </main>
        <Footer />
        <QuickContact />
        <BackToTop />
        <MobileBookingBar />
      </body>
    </html>
  );
}
