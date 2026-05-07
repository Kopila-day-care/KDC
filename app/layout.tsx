import type { Metadata } from "next";
import {
  Luckiest_Guy,
  Plus_Jakarta_Sans,
  Raleway,
  Pacifico,
  Amatic_SC,
  Be_Vietnam_Pro,
} from "next/font/google";
import PublicShell from "@/components/layout/PublicShell";
import "./globals.css";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amatic-sc",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kopila Day Care & Preschool | Hayward, CA",
  description:
    "Licensed home-based day care and preschool in Hayward, CA. Providing nurturing care for ages 6 months to 6 years since 2014.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${luckiestGuy.variable} ${plusJakartaSans.variable} ${raleway.variable} ${pacifico.variable} ${amaticSC.variable} ${beVietnamPro.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
