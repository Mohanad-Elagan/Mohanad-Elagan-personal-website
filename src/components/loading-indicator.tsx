"use client";

import { Brain } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out">
      <div className="relative flex items-center justify-center">
        <Brain className="h-20 w-20 md:h-28 md:w-28 text-primary animate-pulse" />
        {/* Optional: add more sophisticated animation or logo here */}
      </div>
      <p className="mt-6 text-lg font-semibold text-foreground animate-pulse">
        Loading Portfolio...
      </p>
    </div>
  );
}
