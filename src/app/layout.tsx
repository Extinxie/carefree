import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carefree.coffee"),

  title: {
    default: "Carefree — кофейня в Краснодаре",
    template: "%s — Carefree Coffee",
  },

  description:
    "Carefree — кофейня в центре Краснодара. Свежая обжарка, specialty coffee, спокойная атмосфера и кофе без лишней суеты.",

  keywords: [
    "кофейня Краснодар",
    "кофе Краснодар",
    "specialty coffee Краснодар",
    "спешелти кофе Краснодар",
    "кофейня в центре Краснодара",
    "Carefree Coffee",
    "кофе в краснодаре",
    "кофейни",
    "ближайшие кофейни",
  ],

  authors: [
    {
      name: "Carefree Coffee",
    },
  ],

  creator: "Carefree Coffee",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Carefree Coffee",
    title: "Carefree — кофейня в Краснодаре",
    description:
      "Свежая обжарка, спокойная музыка и хороший кофе. Carefree, Краснодар.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Carefree Coffee — кофейня в Краснодаре",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Carefree — кофейня в Краснодаре",
    description: "Specialty coffee и спокойная атмосфера в центре Краснодара.",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn("h-full", "antialiased", inter.variable, display.variable)}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
