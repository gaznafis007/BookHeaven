"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                📚
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">BookHaven</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-foreground hover:text-primary transition"
            >
              Services
            </a>
            <a
              href="#faq"
              className="text-foreground hover:text-primary transition"
            >
              FAQ
            </a>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a
              href="#home"
              className="block text-foreground hover:text-primary transition py-2"
            >
              Home
            </a>
            <a
              href="#services"
              className="block text-foreground hover:text-primary transition py-2"
            >
              Services
            </a>
            <a
              href="#faq"
              className="block text-foreground hover:text-primary transition py-2"
            >
              FAQ
            </a>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Shop Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
