import type { Metadata } from "next";
import {
  Footer,
  Header,
  Hero,
  LocationSection,
  MenuPageComponent,
} from "../components";

export const metadata: Metadata = {
  title: "Кофейня в Краснодаре",

  description:
    "Carefree — кофейня в центре Краснодара. Specialty coffee, свежая обжарка, выпечка и спокойная атмосфера.",

  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",

  "@id": "https://carefree.coffee/#coffee-shop",

  name: "Carefree Coffee",

  description:
    "Кофейня в центре Краснодара со specialty coffee, свежей обжаркой и спокойной атмосферой.",

  url: "https://carefree-coffee.vercel.app",

  image: ["https://carefree.coffee/og.jpg"],

  telephone: "+79283999312",

  priceRange: "₽₽",

  servesCuisine: ["Coffee", "Cafe"],

  address: {
    "@type": "PostalAddress",
    streetAddress: "Постовая, 55",
    addressLocality: "Краснодар",
    addressCountry: "RU",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.0142,
    longitude: 38.9718,
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "07:30",
      closes: "23:00",
    },
  ],

  sameAs: ["https://github.com/Extinxie"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="bg-[#f7f4ee]">
        <Header />
        <Hero />
        <MenuPageComponent />
        <LocationSection />
        <Footer />
      </main>
    </>
  );
}
