// app/layout.tsx
import "./globals.css"; // your Tailwind + global CSS
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import AppInit from "./init/app-init";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Flaamo – Dues made easy",
  description: "Group payments for Ghanaian youth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      {/* The font variables are now global */}
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="flaamo-theme"
          >
            <AppInit />
            {children}
          </ThemeProvider>
        </Providers>
        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
