import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Process from "./components/Process";
import WhyUs from "./components/WhyUs";
import Packages from "./components/Packages";
import Owners from "./components/Owners";
import Reviews from "./components/Reviews";
import ServiceArea from "./components/ServiceArea";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Process />
        <WhyUs />
        <Packages />
        <Owners />
        <Reviews />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
