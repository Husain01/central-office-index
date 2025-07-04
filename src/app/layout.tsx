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
    icon: "/logo-192x192.jpg",
    shortcut: "/logo-192x192.jpg",
    apple: "/logo-192x192.jpg",
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
                      console.log('[App] SW registered successfully');
                      
                      // In development, check for updates more frequently
                      const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
                      
                      if (isDev) {
                        // Check for updates every 3 seconds in development
                        setInterval(function() {
                          registration.update();
                        }, 3000);
                      }
                      
                      // Auto-reload when new version is available
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', function() {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[App] New version available, reloading...');
                            window.location.reload();
                          }
                        });
                      });
                    })
                    .catch(function(error) {
                      console.log('[App] SW registration failed:', error);
                    });
                });
                
                // Auto-reload when service worker takes control
                navigator.serviceWorker.addEventListener('controllerchange', function() {
                  window.location.reload();
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
