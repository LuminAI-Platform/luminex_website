import React from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Testimonials />
    </main>
  );
}
