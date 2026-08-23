import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import Categories from "../sections/Categories";
import FeaturedProducts from "../sections/FeaturedProducts";
import CCTVSection from "../sections/CCTVSection";
import SolarSection from "../sections/SolarSection";
import ServicesSection from "../sections/ServicesSection";
import RepairSection from "../sections/RepairSection";
import WhyEmmytech from "../sections/WhyEmmytech";
import Deals from "../sections/Deals";
import Testimonials from "../sections/Testimonials";
import Newsletter from "../sections/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProducts />
      <CCTVSection />
      <SolarSection />
      <Deals />
      <ServicesSection />
      <RepairSection />
      <WhyEmmytech />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
