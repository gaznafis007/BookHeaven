import { FAQ } from "@/components/custom/Faq";
import { Footer } from "@/components/custom/Footer";
import { Hero } from "@/components/custom/Hero";
import { Navbar } from "@/components/custom/Navbar";
import { Services } from "@/components/custom/Services";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <FAQ />
      <Footer />
    </main>
  );
}
