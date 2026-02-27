import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe OLS HITL",
  description: "OpenShift Lightspeed Human-in-the-Loop Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
