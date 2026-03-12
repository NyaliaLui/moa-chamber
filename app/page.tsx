import Hero from '@app/components/Hero';
import ChamberHighlight from '@app/components/ChamberHighlight';
import Benefits from '@app/components/Benefits';
import Testimonials from '@app/components/Testimonials';
import CTA from '@app/components/CTA';
import {
  fetchHome,
  fetchBenefits,
  fetchTestimonials,
} from '@app/hooks/WixServer';

export default async function Home() {
  const [homeData, benefitsData, testimonialsData] = await Promise.all([
    fetchHome(),
    fetchBenefits(),
    fetchTestimonials(),
  ]);

  return (
    <div className="mx-auto relative">
      <Hero image={homeData.heroImage} />
      <ChamberHighlight highlightData={homeData.highlightData} />
      <Benefits benefitsData={benefitsData} />
      <Testimonials testimonialsData={testimonialsData} />
      <CTA />
    </div>
  );
}
