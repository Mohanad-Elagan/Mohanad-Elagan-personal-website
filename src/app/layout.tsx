import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { cn } from '@/lib/utils'; 
import { LoadingIndicator } from '@/components/loading-indicator';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mohanad Elagan - Portfolio',
  description: 'Personal portfolio website of Mohanad Elagan, showcasing projects and skills.',
  icons: {
  icon: [
    { url: '/fafavicon.ico' },
    { url: '/fafavicon.png', type: 'image/png' }
  ],
  apple: [
    { url: '/fafavicon.png', type: 'image/png' }
  ]
}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${GeistSans.variable} font-sans ${inter.className}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

