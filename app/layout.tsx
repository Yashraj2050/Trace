import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "sonner";
import { Loader } from "@/components/ui/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://trace-os.vercel.app"),
  title: {
    default: "Trace — Every choice leaves a trace.",
    template: "%s | Trace",
  },
  description:
    "Every choice leaves a trace. An interactive, story-driven cinematic experience to track and reduce your carbon footprint using AI.",
  keywords: [
    "carbon footprint",
    "sustainability",
    "climate tracking",
    "green living",
    "AI carbon calculator",
    "environmental impact",
    "eco tracker",
    "CO2 emissions",
  ],
  authors: [{ name: "Trace" }],
  creator: "Trace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Trace — Every choice leaves a trace.",
    description:
      "Every choice leaves a trace. An interactive, story-driven cinematic experience to track and reduce your carbon footprint using AI.",
    url: "https://trace-os.vercel.app",
    siteName: "Trace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trace — Carbon Intelligence OS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trace — Every choice leaves a trace.",
    description:
      "Every choice leaves a trace. Track and reduce your carbon footprint with AI precision.",
    images: ["/og-image.png"],
    creator: "@traceai",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Loader />
            {children}
          </SmoothScrollProvider>
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "oklch(5% 0 0)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
