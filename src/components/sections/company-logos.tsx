"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

const logos = [
  { id: 'stem', src: '/img/stem.png', alt: 'STEM' },
  { id: 'harvard', src: '/img/Harvard.png', alt: 'Harvard University' },
  { id: 'mit', src: '/img/MIT.png', alt: 'MIT' },
  { id: 'nyas', src: '/img/nyas.png', alt: 'New York Academy of Sciences' },
  { id: 'ieee', src: '/img/ieee.png', alt: 'IEEE' },
  { id: 'bc', src: '/img/bc.png', alt: 'Berea College' },
  { id: 'columbia', src: '/img/columbia.png', alt: 'Columbia University' },
  { id: 'chicago', src: '/img/chicago.png', alt: 'University of Chicago' },
  { id: 'children', src: '/img/children.png', alt: "Children's Cancer Hospital 57357" },
  { id: 'x-culture', src: '/img/x-culture.png', alt: 'X-Culture' },
  { id: 'lumiere', src: '/img/lumiere.png', alt: 'Lumiere' },
  { id: 'ctd', src: '/img/ctd.png', alt: 'Closing the Divide' },
  { id: 'hack', src: '/img/hack.png', alt: 'Hack Club' },
];

export function CompanyLogosSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="border-b border-border/60 bg-muted/30 py-8">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Affiliations, programs &amp; recognition
        </p>
        {!mounted ? (
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-24 rounded bg-muted" />
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-scroll items-center gap-12 py-1">
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div
                  key={`${logo.id}-${idx}`}
                  className="relative h-10 w-28 flex-shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-12 md:w-32"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
