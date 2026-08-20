import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "where-dreams-live.pages.dev";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const description =
    "Download Becoming, the first issue of Where Dreams Live, a magazine for lovers of creative writing.";

  return {
    metadataBase: baseUrl,
    title: "Becoming | Where Dreams Live, Issue 01",
    description,
    icons: {
      icon: "/magazine/mark.jpg",
      shortcut: "/magazine/mark.jpg",
    },
    openGraph: {
      title: "Becoming | Where Dreams Live, Issue 01",
      description,
      type: "website",
      images: [{ url: new URL("/og.png", baseUrl).toString(), width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Becoming | Where Dreams Live, Issue 01",
      description,
      images: [new URL("/og.png", baseUrl).toString()],
    },
  };
}

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
