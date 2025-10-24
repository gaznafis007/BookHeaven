import { FAQ } from "@/components/custom/Faq";
import { Footer } from "@/components/custom/Footer";
import { Hero } from "@/components/custom/Hero";
import { Services } from "@/components/custom/Services";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <FAQ />
      <Footer />
    </main>
  );
}
