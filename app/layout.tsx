import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "The Cadmus Companion",
  description:
    "Fast self-mastery companion for The Code of Cadmus — Cadmus Session, inner voices map, and your detox track.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-full min-h-[100dvh] antialiased`}
        style={
          {
            ["--font-sans-stack" as string]: `var(--font-inter), 'Helvetica Neue', Helvetica, Arial, ui-sans-serif, system-ui, sans-serif`,
          } as React.CSSProperties
        }
      >
        <Script id="cadmus-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('cadmus-theme');if(t==='minimal'||t==='colorful')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','minimal');}catch(e){document.documentElement.setAttribute('data-theme','minimal');}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
