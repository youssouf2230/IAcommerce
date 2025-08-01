import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Toaster } from "sonner";

const inter = Inter({
  weight: ["400", "500", "600", "700"], // Ensure you load the required weights
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Reeltek - Electronics & Smart Tech",
  description: "Discover cutting-edge electronics at Reeltek. Shop the latest smartphones, laptops, audio gear, and accessories with fast delivery and top-notch support.",

};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (

    <html lang={locale}  >
      <body
        className={` ${inter.variable} font-inter  bg-background text-foreground   antialiased`}
      >
        <NextIntlClientProvider>


          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster position="bottom-right" richColors closeButton />
          </ThemeProvider>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
