'use client';

import Hero from '@app/components/Hero';
import ChamberHighlight from '@app/components/ChamberHighlight';
import Benefits from '@app/components/Benefits';
import Testimonials from '@app/components/Testimonials';
import CTA from '@app/components/CTA';
import { useWixHome, useWixBenefits, useWixTestimonials } from '@app/hooks/Wix';

import LoadingState from '@app/components/LoadingState';

export default function Home() {
  const {
    data: homeData,
    isLoading: homeLoading,
    error: homeError,
  } = useWixHome();
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

  const isLoading = homeLoading || benefitsLoading || testimonialsLoading;
  const error = homeError || benefitsError || testimonialsError;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    throw error;
  }

  if (!homeData || !benefitsData || !testimonialsData) {
    throw new Error('home page data is undefined');
  }

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
