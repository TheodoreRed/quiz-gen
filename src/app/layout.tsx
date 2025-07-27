import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalToast from "../ui/common/GlobalToast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { CssBaseline } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz Generator",
  description: "Generate quizzes with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <CssBaseline />
          {children}
          <GlobalToast />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
