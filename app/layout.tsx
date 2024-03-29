import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/src/components/header/Header";
import { CONTENT_WIDTH } from "@/src/data/consts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trigger Riot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>{children}</div>
      </body>
    </html>
  );
}
