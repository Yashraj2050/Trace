import type { Metadata } from "next";
import LoginPage from "./page";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Trace account and access your carbon intelligence dashboard.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
};

export default LoginPage;
