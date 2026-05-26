import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import StatsReveal from "./components/StatsReveal";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Packages from "./components/Packages";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsReveal>
          <Stats />
        </StatsReveal>
        <Services />
        <WhyUs />
        <Packages />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
