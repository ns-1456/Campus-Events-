"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/site/MobileNav";
import { UserDropdown } from "@/components/site/UserDropdown";
import { useAuthSafe } from "@/lib/auth-context";
import { ArrowLeft } from "lucide-react";

interface SiteHeaderProps {
  showBackButton?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function SiteHeader({ showBackButton = false, backHref = "/", backLabel = "Home" }: SiteHeaderProps) {
  const { user } = useAuthSafe();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          {showBackButton && (
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
              <Link href={backHref} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Link>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">CE</span>
            </div>
            <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
              Campus Events
            </span>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/events" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Events
          </Link>
          <Link href="/organizer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Organizers
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="text-sm">
                <Link href="/auth/signin">Log In</Link>
              </Button>
              <Button asChild className="text-sm">
                <Link href="/auth/signin">Get Started</Link>
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
