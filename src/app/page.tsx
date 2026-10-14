import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Leadership from "@/components/Leadership";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Products from "@/components/Products";
import Quality from "@/components/Quality";
import RevealController from "@/components/RevealController";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Products />
        <Process />
        <Quality />
        <Gallery />
        <Clients />
        <WhyUs />
        <Leadership />
        <Contact />
      </main>
      <RevealController />
    </>
  );
}
