"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                📚
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">BookHaven</span>
          </Link>

          {/* Login Button */}
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
