"use client";

import { useEffect, useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Users, Globe2, MapPinned } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import {
  recordVisit,
  countryCentroid,
  type CountryTally,
} from '@/lib/site-reach';

const GEO_URL = '/geo/countries-110m.json';
const COUNTER_NS = 'mohanad-elagan-personal-site';
const COUNTER_KEY = 'visits';

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border/70 bg-card/60 px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <p className="font-serif text-xl font-semibold leading-none text-foreground">{value}</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function SiteReachSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const [tally, setTally] = useState<CountryTally>({});
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    setTally(recordVisit());

    const counted = sessionStorage.getItem('siteReach.counted.global');
    const endpoint = counted ? 'get' : 'hit';
    fetch(`https://abacus.jasoncameron.dev/${endpoint}/${COUNTER_NS}/${COUNTER_KEY}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { value?: number }) => {
        if (typeof data.value === 'number') {
          setVisitors(data.value);
          sessionStorage.setItem('siteReach.counted.global', '1');
        }
      })
      .catch(() => setVisitors(null));
  }, []);

  const { seenCountries, topCountries, markers } = useMemo(() => {
    const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const seen = new Set(entries.map(([c]) => c));
    const mk = entries
      .map(([country, count]) => {
        const c = countryCentroid(country);
        return c ? { country, count, coordinates: [c.lon, c.lat] as [number, number] } : null;
      })
      .filter((m): m is { country: string; count: number; coordinates: [number, number] } => m !== null);
    return { seenCountries: seen, topCountries: entries.slice(0, 5), markers: mk };
  }, [tally]);

  const visitorsLabel =
    visitors !== null ? visitors.toLocaleString() : '—';
  const countriesLabel = seenCountries.size > 0 ? String(seenCountries.size) : '—';

  return (
    <section id="site-reach" className="border-t border-border/60 py-14">
      <div className="container mx-auto max-w-5xl px-5 sm:px-6">
        <div
          ref={ref}
          className={cn(
            'transition-all duration-700 ease-out',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          )}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            <p className="eyebrow">Site Reach</p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
            {/* Stats column */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Where readers visit from
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A light, aggregate view of how far this page travels.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <Stat icon={<Users className="h-4 w-4" />} value={visitorsLabel} label="Total visitors" />
                <Stat icon={<Globe2 className="h-4 w-4" />} value={countriesLabel} label="Locations" />
              </div>

              {topCountries.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                    <MapPinned className="h-3.5 w-3.5" /> Top locations
                  </p>
                  <ul className="space-y-1.5">
                    {topCountries.map(([country, count]) => (
                      <li
                        key={country}
                        className="flex items-center justify-between text-sm text-foreground/90"
                      >
                        <span>{country}</span>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Map column */}
            <div className="overflow-hidden rounded-lg border border-border/70 bg-muted/30">
              <ComposableMap
                projection="geoEqualEarth"
                projectionConfig={{ scale: 150 }}
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
                aria-label="World map showing approximate, aggregate visitor locations"
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties.name as string;
                      const active = seenCountries.has(name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: {
                              fill: active ? 'hsl(var(--primary) / 0.35)' : 'hsl(var(--muted))',
                              stroke: 'hsl(var(--border))',
                              strokeWidth: 0.4,
                              outline: 'none',
                            },
                            hover: {
                              fill: active ? 'hsl(var(--primary) / 0.45)' : 'hsl(var(--muted))',
                              stroke: 'hsl(var(--border))',
                              strokeWidth: 0.4,
                              outline: 'none',
                            },
                            pressed: { outline: 'none' },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {markers.map((m) => (
                  <Marker key={m.country} coordinates={m.coordinates}>
                    <circle r={4} fill="hsl(var(--secondary))" stroke="hsl(var(--background))" strokeWidth={1} />
                    <circle r={4} fill="hsl(var(--secondary))" opacity={0.35}>
                      <animate attributeName="r" from="4" to="9" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.35" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </Marker>
                ))}
              </ComposableMap>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Visitor locations are approximate and shown only in aggregate. No personal
            information is displayed. Locations are estimated from your browser&apos;s time-zone
            setting on your own device — no IP addresses, precise locations, or device details
            are collected or stored.
          </p>
        </div>
      </div>
    </section>
  );
}
