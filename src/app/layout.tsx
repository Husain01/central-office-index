import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashara Central Office - MSB",
  description:
    "Floor-wise office directory with contact information and navigation for Ashara Central Office - MSB",
  manifest: "/manifest.json",
  keywords: [
    "office",
    "directory",
    "contact",
    "floor plan",
    "navigation",
    "ashara",
    "MSB",
  ],
  authors: [{ name: "Ashara Central Office - MSB" }],
  creator: "Ashara Central Office - MSB",
  publisher: "Ashara Central Office - MSB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/General Logo 1447.jpg",
    shortcut: "/General Logo 1447.jpg",
    apple: "/General Logo 1447.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Office Index - MSB",
  },
  openGraph: {
    type: "website",
    siteName: "Ashara Central Office - MSB",
    title: "Ashara Central Office - MSB",
    description:
      "Floor-wise office directory with contact information and navigation for Ashara Central Office - MSB",
  },
  twitter: {
    card: "summary",
    title: "Ashara Central Office - MSB",
    description:
      "Floor-wise office directory with contact information and navigation for Ashara Central Office - MSB",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
