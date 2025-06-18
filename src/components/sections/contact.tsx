"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import type { FormEvent } from 'react';

export function ContactSection() {
  const { ref: formCardRef, isVisible: formCardIsVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });
  const { ref: infoCardRef, isVisible: infoCardIsVisible } = useScrollAnimation<HTMLDivElement>({ triggerOnce: true });

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-muted/30 rounded-xl shadow-inner_lg overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="https://picsum.photos/seed/darkmapbg/1920/1080"
          alt="Dark map background"
          fill
          style={{ objectFit: 'cover' }}
          quality={75}
          data-ai-hint="dark map"
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-background/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block group">
            Get In <span className="text-primary">Touch</span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card 
            ref={formCardRef}
            className={cn(
              "shadow-lg transition-all duration-700 ease-out bg-card/80 backdrop-blur-sm",
              formCardIsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              <CardDescription>Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action="https://formspree.io/f/xgeqkkwl" method="POST" className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Your Name *" 
                    required 
                    className="bg-background/70" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">Email Address</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="your.email@example.com *" 
                    required 
                    className="bg-background/70"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium leading-none">Your Phone</label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    placeholder="Your Phone" 
                    className="bg-background/70"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium leading-none">Subject</label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    placeholder="Regarding your project..." 
                    required
                    className="bg-background/70"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Your Message *" 
                    rows={5} 
                    required 
                    className="bg-background/70"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full shadow-md hover:shadow-lg transition-shadow">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div 
            ref={infoCardRef}
            className={cn(
              "space-y-8 flex flex-col justify-center transition-all duration-700 ease-out",
              infoCardIsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
             <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                    <CardDescription>You can also reach me through these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-6 w-6 text-primary" />
                        <Link href="mailto:elaganm@berea.edu" className="text-foreground hover:text-primary transition-colors">
                            elaganm@berea.edu
                        </Link>
                         <span className="text-muted-foreground">||</span>
                        <Link href="mailto:mohanad.elagan1@gmail.com" className="text-foreground hover:text-primary transition-colors">
                            mohanad.elagan1@gmail.com
                        </Link>
                    </div>
                     <div className="flex items-center gap-3">
                        <Linkedin className="h-6 w-6 text-primary" />
                        <Link href="https://www.linkedin.com/in/mohanadelagan/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                            linkedin.com/in/mohanadelagan
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <Github className="h-6 w-6 text-primary" />
                        <Link href="https://github.com/Mohanad-Elagan" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                            github.com/Mohanad-Elagan
                        </Link>
                    </div>
                </CardContent>
             </Card>
             <p className="text-center text-muted-foreground bg-background/60 backdrop-blur-sm p-3 rounded-md">
                I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}

