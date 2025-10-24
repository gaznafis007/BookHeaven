import { Hero } from "@/components/custom/Hero";
import { Navbar } from "@/components/custom/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}
