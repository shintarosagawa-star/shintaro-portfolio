import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "佐川新太郎 | 貪欲に、素直に、全力で。",
  description:
    "川崎フロンターレ・ジュビロ磐田・静岡学園出身。サッカーと同じ熱量でビジネスを戦う22歳。",
  openGraph: {
    title: "佐川新太郎 | 貪欲に、素直に、全力で。",
    description:
      "川崎フロンターレ・ジュビロ磐田・静岡学園出身。サッカーと同じ熱量でビジネスを戦う22歳。",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
