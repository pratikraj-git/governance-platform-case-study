import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SITE } from '@/lib/constants';
import { SiteShell } from '@/components/layout/SiteShell';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.shortTitle,
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // The hero loads on the dark surface; the rest of the page on the warm canvas.
  // Two tinted entries keeps the browser chrome consistent with the active section.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF7' },
    { media: '(prefers-color-scheme: dark)',  color: '#0E0F0E' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
