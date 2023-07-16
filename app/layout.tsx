"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/src/components/header/Header";
import { CONTENT_WIDTH } from "@/src/data/consts";
import { useAudioContextStore } from "@/src/data/audioContextStore";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Trigger Riot",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { audioContext, setAudioContext } = useAudioContextStore((state) => ({
    audioContext: state.audioContext,
    setAudioContext: state.setAudioContext,
  }));

  // todo: this should be moved (should not be client component)
  useEffect(() => {
    setAudioContext(
      new (window.AudioContext || (window as any).webkitAudioContext)()
    );
  }, [setAudioContext]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {audioContext && (
          <div style={{ width: CONTENT_WIDTH, margin: "0 auto" }}>
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
