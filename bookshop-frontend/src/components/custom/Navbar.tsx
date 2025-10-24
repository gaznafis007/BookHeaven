"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthContext";

export function Navbar() {
  const { currentUser } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur supports-backdrop-filter:bg-background/80">
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

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <Link href="/books">
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 transition-colors hover:text-black hover:cursor-pointer"
                  >
                    Books
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:cursor-pointer">
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
