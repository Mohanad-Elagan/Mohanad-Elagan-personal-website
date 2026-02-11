"use client"; // Required for the hook

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Layers, CheckCircle, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { SectionTitle } from '@/components/section-title';

const coreValues = [
  { 
    icon: <Brain className="h-6 w-6 text-primary" />, 
    title: "Curiosity", 
    description: "Driven by a desire to explore uncharted knowledge—whether in code, medicine, or design—and constantly ask \"what's next?\"" 
  },
  { 
    icon: <Layers className="h-6 w-6 text-primary" />, 
    title: "Interdisciplinary Thinking", 
    description: "Blending engineering and the arts to create impactful solutions that live at the intersection of science and creativity." 
  },
  { 
    icon: <CheckCircle className="h-6 w-6 text-primary" />, 
    title: "Precision", 
    description: "Committed to detail-oriented work, from clinical modeling to full-stack development—where accuracy and clarity are critical." 
  },
  { 
    icon: <TrendingUp className="h-6 w-6 text-primary" />, 
    title: "Growth Mindset", 
    description: "Always seeking opportunities to learn, iterate, and expand my skillset through hands-on challenges, research, and mentorship." 
  },
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50 rounded-xl shadow-inner_lg overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <SectionTitle title="About Me" highlight="Me" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <div className="text-lg text-foreground leading-relaxed">
              <h3 className="group inline-block text-2xl mb-4">
                <span className="font-bold">Welcome!</span>
                <span className="block w-12 group-hover:w-full transition-all duration-500 h-0.5 bg-primary"></span>
              </h3>
              <p className="mb-4">
                I'm Mohanad Elagan, an undergraduate student pursuing a <strong className="font-semibold">B.A. degree in Neuroscience and Mathematics with a minor in Computer Science</strong>.
              </p>
              <p>
                Outside of technical projects, I explore storytelling through <strong className="font-semibold">beatboxing</strong>, <strong className="font-semibold">photography/designing</strong>, and <strong className="font-semibold">poetry</strong>, always seeking new ways to express ideas and reimagine what&apos;s possible.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreValues.map((value, index) => (
              <Card key={value.title} className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {value.icon}
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
