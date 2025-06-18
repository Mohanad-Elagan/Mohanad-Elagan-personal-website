import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mohanad Elagan. All rights reserved.
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild aria-label="GitHub Profile">
            <Link href="https://github.com/Mohanad-Elagan" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="LinkedIn Profile">
            <Link href="https://www.linkedin.com/in/mohanadelagan/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Email Mohanad">
            <Link href="mailto:mohanad.elagan1@gmail.com">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
