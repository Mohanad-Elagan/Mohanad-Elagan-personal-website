"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const logos = [
  { id: 'google', src: '/img/stem.png', alt: 'STEM Logo', hint: 'stem logo' },
  { id: 'harvard', src: '/img/Harvard.png', alt: 'Harvard University Logo', hint: 'harvard university' },
  { id: 'mit', src: '/img/MIT.png', alt: 'MIT Logo', hint: 'mit university' },
  { id: 'openai', src: '/img/nyas.png', alt: 'NYAS Logo', hint: 'nyas logo' },
  { id: 'microsoft', src: '/img/ieee.png', alt: 'IEEE Logo', hint: 'ieee logo' },
  { id: 'bc', src: '/img/bc.png', alt: 'BC Logo', hint: 'bc logo' },
  { id: 'x-culture', src: '/img/x-culture.png', alt: 'X-Culture Logo', hint: 'x-culture logo' },
  { id: 'lumiere', src: '/img/lumiere.png', alt: 'Lumiere Logo', hint: 'lumiere logo' },
  { id: 'chicago', src: '/img/chicago.png', alt: 'Chicago Logo', hint: 'chicago logo' },
  { id: 'children', src: '/img/children.png', alt: 'Children Logo', hint: 'children logo' },
  { id: 'columbia', src: '/img/columbia.png', alt: 'Columbia Logo', hint: 'columbia logo' },
  { id: 'ctd', src: '/img/ctd.png', alt: 'CTD Logo', hint: 'ctd logo' },
  { id: 'hack', src: '/img/hack.png', alt: 'Hack Logo', hint: 'hack logo' },
];

export function CompanyLogosSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-1 md:py-1 mt-0 mb-8">
        <div className="animate-pulse flex flex-wrap justify-around items-center gap-x-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-24 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-0 mb-8 overflow-hidden">
      <div className="relative">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-x-4 py-1 md:py-1" style={{ width: 'fit-content' }}>
            {/* First set of logos */}
            {logos.map((logo) => (
              <div key={logo.id} className="relative h-12 md:h-16 w-32 md:w-40 flex-shrink-0 transition-all duration-300 ease-in-out opacity-70 hover:opacity-100">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  data-ai-hint={logo.hint}
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            ))}
            {/* Second set of logos */}
            {logos.map((logo) => (
              <div key={`${logo.id}-duplicate`} className="relative h-12 md:h-16 w-32 md:w-40 flex-shrink-0 transition-all duration-300 ease-in-out opacity-70 hover:opacity-100">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  data-ai-hint={logo.hint}
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            ))}
            {/* Third set of logos for seamless loop */}
            {logos.map((logo) => (
              <div key={`${logo.id}-triplicate`} className="relative h-12 md:h-16 w-32 md:w-40 flex-shrink-0 transition-all duration-300 ease-in-out opacity-70 hover:opacity-100">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  data-ai-hint={logo.hint}
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
