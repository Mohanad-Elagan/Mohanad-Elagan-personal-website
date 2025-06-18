"use client";

import { skillCategories } from '@/data/skills';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { SectionTitle } from '@/components/section-title';

interface SkillCardProps {
  category: {
    name: string;
    skills: string[];
    icon?: ReactNode;
  };
  index: number;
}

function SkillCard({ category, index }: SkillCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true, threshold: 0.1 });

  return (
    <Card
      ref={ref}
      className={cn(
        "shadow-lg hover:shadow-xl transition-all duration-500 ease-out flex flex-col",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        {category.icon && <div className="p-2 bg-primary/10 rounded-md">{category.icon}</div>}
        <CardTitle className="text-xl text-foreground">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm font-medium">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/30 rounded-xl shadow-inner_lg overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <SectionTitle title="Skills" />
        <p className="text-center text-muted-foreground mb-12">
          A comprehensive overview of my technical and professional capabilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

