
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Common content rendering logic
  const heroContent = (
    <div className={cn(
      "relative z-10 container mx-auto px-4 transition-all duration-1000 ease-out",
      mounted ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
    )}>
      <div className="max-w-3xl mx-auto">
        <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-8 rounded-full overflow-hidden shadow-lg border-4 border-primary/50">
          <Image 
            src="/img/profile.jpg" 
            alt="Mohanad Elagan" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            data-ai-hint="professional photo Mohanad"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.srcset = 'https://picsum.photos/seed/mohanadprofile/180/180';
              target.src = 'https://picsum.photos/seed/mohanadprofile/180/180';
            }}
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white"> {/* Changed text color for contrast */}
          Hi, I&apos;m <span className="text-primary">Mohanad Elagan</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 font-bold"> {/* Changed text color for contrast and made bold */}
          Developer/Researcher - Graphic Designer - Writer
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="#projects">
              View My Projects <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="#contact">
              Get In Touch
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  // SSR/Pre-hydration: Use static Tailwind classes for the gradient
  if (!mounted) {
    return (
      <section 
        id="hero" 
        ref={heroRef}
        className="relative py-20 md:py-32 text-center bg-gradient-to-br from-background to-muted/30 rounded-xl shadow-inner_lg overflow-hidden"
      >
         <div className="absolute inset-0 z-[-1] bg-gray-800"></div>
        {heroContent}
      </section>
    );
  }

  // Client-side rendered with background image
  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative py-20 md:py-32 text-center rounded-xl shadow-inner_lg overflow-hidden"
    >
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/img/background.jpg" // Changed image source
          alt="Abstract technology background" // Updated alt text
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
          data-ai-hint="tech background abstract" // Updated data-ai-hint
           onError={(e) => { // Fallback if local background image fails
              const target = e.target as HTMLImageElement;
              target.srcset = 'https://picsum.photos/seed/hero-fallback-bg/1920/1080';
              target.src = 'https://picsum.photos/seed/hero-fallback-bg/1920/1080';
            }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {heroContent}
    </section>
  );
}

