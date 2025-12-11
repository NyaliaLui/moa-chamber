'use client';

import Hero from '@app/components/Hero';
import ChamberHighlight from '@app/components/ChamberHighlight';
import Benefits from '@app/components/Benefits';
import Testimonials from '@app/components/Testimonials';
import CTA from '@app/components/CTA';
import {
  useWixHero,
  useWixHighlight,
  useWixBenefits,
  useWixTestimonials,
} from '@app/hooks/Wix';

import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

export default function Home() {
  const {
    data: heroImage,
    isLoading: heroLoading,
    error: heroError,
  } = useWixHero();
  const {
    data: highlightData,
    isLoading: highlightLoading,
    error: highlightError,
  } = useWixHighlight();
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
    heroLoading || highlightLoading || benefitsLoading || testimonialsLoading;
  const error =
    heroError || highlightError || benefitsError || testimonialsError;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!heroImage || !highlightData || !benefitsData || !testimonialsData) {
    return <ErrorState error={new Error('home page data is undefined')} />;
  }

  return (
    <div className="mx-auto relative">
      <Hero image={heroImage} />
      <ChamberHighlight highlightData={highlightData} />
      <Benefits benefitsData={benefitsData} />
      <Testimonials testimonialsData={testimonialsData} />
      <CTA />
    </div>
  );
}
