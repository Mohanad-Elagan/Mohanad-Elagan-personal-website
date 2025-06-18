"use client";

import Link from 'next/link';
import { Menu, User, Mail, Code2, Briefcase, Wrench, Palette, HomeIcon, Activity, Feather, Brain } from 'lucide-react'; // Changed to Brain
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { usePathname } from 'next/navigation';

const navItems = [
  // { href: '/#hero', label: 'Home', icon: <HomeIcon className="h-5 w-5" /> }, // Conceptual Home, no direct link
  { href: '/#about', label: 'About', icon: <User className="h-5 w-5" /> },
  { href: '/#experience', label: 'Experience', icon: <Activity className="h-5 w-5" /> },
  { href: '/#skills', label: 'Skills', icon: <Wrench className="h-5 w-5" /> },
  { href: '/#projects', label: 'Papers & Projects', icon: <Briefcase className="h-5 w-5" /> },
  { href: '/#graphic-design', label: 'Graphic Design', icon: <Palette className="h-5 w-5" /> },
  // { href: '/#creative-writing', label: 'Creative Writing', icon: <Feather className="h-5 w-5" /> }, // Removed as per previous changes.
  { href: '/#contact', label: 'Contact', icon: <Mail className="h-5 w-5" /> },
];

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    
    if (pathname !== '/') { 
      setActiveSection(''); 
      return;
    }

    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
      setActiveSection(initialHash);
    } else {
      if (pathname === '/') {
        setActiveSection('hero'); 
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } 
    );
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        observer.observe(heroSection);
    }

    const sections = navItems
      .map(item => item.href.split('#')[1])
      .filter(Boolean) 
      .map(id => document.getElementById(id))
      .filter(section => section !== null) as HTMLElement[];
    
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
      sections.forEach(section => {
        if (section) {
            observer.unobserve(section);
        }
      });
    };
  }, [pathname]);


  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Mohanad Elagan</span>
          </div>
          <div className="h-8 w-8 rounded-md bg-muted md:hidden"></div> {/* Placeholder for mobile menu trigger */}
        </div>
      </header>
    );
  }
  
  const isRootPageWithSections = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/#hero" className="flex items-center gap-2" aria-label="Navigate to Home Page">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Mohanad Elagan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => {
            const sectionId = item.href.split('#')[1] || '';
            const isActive = isRootPageWithSections && activeSection === sectionId;
            return (
              <Button
                key={item.label}
                variant={isActive ? "secondary" : "ghost"}
                asChild
                className={`px-3 py-2 text-sm transition-colors duration-200 ${isActive ? 'font-semibold' : ''}`}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <ThemeToggleButton />
        </div>


        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open mobile menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  const sectionId = item.href.split('#')[1] || '';
                  const isActive = isRootPageWithSections && activeSection === sectionId;
                  return (
                    // SheetClose ensures the sheet closes when a link is clicked
                    <SheetClose asChild key={item.label}> 
                      <Link
                          href={item.href}
                          className={`flex items-center gap-3 rounded-lg p-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${isActive ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
