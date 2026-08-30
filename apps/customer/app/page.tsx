import { Hero } from "@/components/sections/hero";
import { FeaturedMenu } from "@/components/sections/featured-menu";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedMenu />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}