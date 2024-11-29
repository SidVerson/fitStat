import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    //themeColor: "#18181b",
  };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitStat: Анализируйте и преумножайте свои успехи в спорте",
  description:
    "Возьмите под контроль свои фитнес-цели с помощью FitStat. Интуитивно понятное веб-приложение для отслеживания тренировок, разработанное для оптимизации занятий в спортзале и улучшения результатов.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className="min-h-dvh flex flex-col"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} flex flex-col grow overflow-x-hidden`}
      >
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#18181b",
                border: "none",
                color: "white",
              },
            }}
          />
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
