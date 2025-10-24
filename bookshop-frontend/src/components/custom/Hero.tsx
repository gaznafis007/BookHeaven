"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-background via-background to-secondary/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-primary font-semibold text-sm uppercase tracking-wide">
                Welcome to BookHaven
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Discover Your Next{" "}
                <span className="text-primary">Great Read</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore thousands of books across all genres. From timeless
                classics to contemporary bestsellers, find your perfect escape.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Browse Collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 hover:text-black bg-transparent"
              >
                Learn More
              </Button>
            </div>

            <div className="flex gap-8 pt-8">
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Books Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">100K+</p>
                <p className="text-sm text-muted-foreground">Happy Readers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">
                  Customer Support
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl"></div>
            <Image
              src="https://ik.imagekit.io/uc8ejfj1j/drop-folder/books_5rYkZw_ZG.jpg"
              alt="Books collection"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
