import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import { person, site } from "@/lib/content";
import { themeBootScript } from "@/lib/themes";
import ThemeProvider from "@/components/shell/ThemeProvider";
import CommandPalette from "@/components/shell/CommandPalette";
import PaperChrome from "@/components/chrome/PaperChrome";
import VSCodeChrome from "@/components/chrome/VSCodeChrome";
import TerminalChrome from "@/components/chrome/TerminalChrome";
import KeyboardChrome from "@/components/chrome/KeyboardChrome";
import ChatChrome from "@/components/chrome/ChatChrome";
import Footer from "@/components/ui/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { graph, orgNode, personNode, websiteNode } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${person.name} | Full-stack developer in Ahmedabad`, template: `%s | ${person.name}` },
  description: person.summary,
  applicationName: site.handle,
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  icons: { icon: "/favicon.png" },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1d21" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="paper" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">Skip to content</a>
        <ThemeProvider>
          <PaperChrome />
          <VSCodeChrome />
          <TerminalChrome />
          <KeyboardChrome />
          <ChatChrome />
          <div className="frame">
            <main id="main">{children}</main>
            <Footer />
          </div>
          <CommandPalette />
        </ThemeProvider>
        <JsonLd data={graph(personNode(), orgNode(), websiteNode())} />
      </body>
    </html>
  );
}
