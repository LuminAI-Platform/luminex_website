import React from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Team from "@/components/Team";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Fleet />
      <Team />
    </main>
  );
}
