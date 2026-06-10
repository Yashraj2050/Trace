import type { Metadata } from "next";
import SignupPage from "./page";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a free Trace account and start tracking your carbon footprint with AI-powered precision.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/signup" },
};

export default SignupPage;
