import { Montserrat, Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Next Track",
  description:
    "Descubra novas músicas com inteligência artificial baseada nas suas playlists do Spotify.",
  authors: [{ name: "Gustavo Aguiar" }],
  keywords: [
    "next track",
    "músicas",
    "recomendações musicais",
    "inteligência artificial",
    "spotify",
    "playlist",
    "descoberta musical",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Next Track - Recomendações com IA",
    description:
      "Conecte seu Spotify e descubra músicas novas baseadas no que você já ouve.",
    // url: "https://next-track.vercel.app",
    siteName: "Next Track",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} ${jakarta.variable} dark antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
