import './globals.css';
import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Mohanad Elagan — Undergraduate Researcher',
  description:
    'Mohanad Elagan is an undergraduate researcher at Berea College working at the intersection of clinical psychology, biomedical AI, and neuroscience.',
  icons: {
    icon: [
      { url: '/fafavicon.ico' },
      { url: '/fafavicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/fafavicon.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, sourceSerif.variable, 'font-sans')}>
        <div className="flex min-h-screen flex-col">
          <div className="arabesque-band w-full" aria-hidden="true" />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
