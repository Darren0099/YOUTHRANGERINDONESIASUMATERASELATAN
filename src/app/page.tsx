import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import {
  About,
  Benefits,
  Collaborators,
  Explore,
  Faq,
  Instagram,
  LatestNews,
  Offer,
  Support,
} from "@/components/HomeSections";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Benefits />
        <Explore />
        <Offer />
        <Support />
        <LatestNews />
        <Instagram />
        <Collaborators />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
