import Hero from '@app/components/Hero';
import NewsCarousel from '@app/components/NewsCarousel';
import Benefits from '@app/components/Benefits';
import Testimonials from '@app/components/Testimonials';
import CTA from '@app/components/CTA';
import { wix } from './hooks/Wix';

export default async function Home() {
  const { collections, singleItemCollections } = await wix();

  return (
    <div className="mx-auto relative sm:px-20 py-2.5">
      <Hero image={singleItemCollections.heroImage} />
      <NewsCarousel newsArticles={collections.newsCarouselData} />
      <Benefits benefitsData={collections.benefitsData} />
      <Testimonials testimonialsData={collections.testimonialsData} />
      <CTA />
    </div>
  );
}
