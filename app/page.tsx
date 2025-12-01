'use client';

import Hero from '@app/components/Hero';
import NewsCarousel from '@app/components/NewsCarousel';
import Benefits from '@app/components/Benefits';
import Testimonials from '@app/components/Testimonials';
import CTA from '@app/components/CTA';
import {
  useWixHero,
  useWixNewsCarousel,
  useWixBenefits,
  useWixTestimonials,
} from '@app/hooks/Wix';

export default function Home() {
  const {
    data: heroImage,
    isLoading: heroLoading,
    error: heroError,
  } = useWixHero();
  const {
    data: newsCarouselData,
    isLoading: newsLoading,
    error: newsError,
  } = useWixNewsCarousel();
  const {
    data: benefitsData,
    isLoading: benefitsLoading,
    error: benefitsError,
  } = useWixBenefits();
  const {
    data: testimonialsData,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useWixTestimonials();

  const isLoading =
    heroLoading || newsLoading || benefitsLoading || testimonialsLoading;
  const error = heroError || newsError || benefitsError || testimonialsError;

  if (isLoading) {
    return (
      <div className="mx-auto relative sm:px-20 py-2.5">
        <div className="container mx-auto text-center py-20">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto relative sm:px-20 py-2.5">
        <div className="container mx-auto text-center py-20">
          <p className="text-lg text-red-600">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!heroImage || !newsCarouselData || !benefitsData || !testimonialsData) {
    return (
      <div className="mx-auto relative sm:px-20 py-2.5">
        <div className="container mx-auto text-center py-20">
          <p className="text-lg text-red-600">
            Error: home page data is undefined
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto relative sm:px-20 py-2.5">
      <Hero image={heroImage} />
      <NewsCarousel newsArticles={newsCarouselData} />
      <Benefits benefitsData={benefitsData} />
      <Testimonials testimonialsData={testimonialsData} />
      <CTA />
    </div>
  );
}
