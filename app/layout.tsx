import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Toaster } from "sonner";
import { Loader } from "@/components/ui/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trace — Every choice leaves a trace.",
    template: "%s | Trace",
  },
  description:
    "Every choice leaves a trace. An interactive, story-driven cinematic experience to track and reduce your carbon footprint using AI.",
  keywords: [
    "carbon footprint",
    "sustainability",
    "3D Earth",
    "climate",
    "green living",
  ],
  authors: [{ name: "Trace" }],
  creator: "Trace",
  openGraph: {
    title: "Trace — Every choice leaves a trace.",
    description: "Every choice leaves a trace. An interactive, story-driven cinematic experience to track and reduce your carbon footprint using AI.",
    url: "https://trace.ai",
    siteName: "Trace",
    images: [
      {
        url: "https://trace.ai/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Trace Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trace",
    description: "Every choice leaves a trace. An interactive, story-driven cinematic experience to track and reduce your carbon footprint using AI.",
    images: ["https://trace.ai/og-logo.png"],
    creator: "@traceai",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
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
