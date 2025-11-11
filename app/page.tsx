import Link from 'next/link';

import Hero from '@app/components/Hero';
import NewsCarousel from '@app/components/NewsCarousel';
import Benefits from '@app/components/Benefits';
import Testimonials from '@app/components/Testimonials';
import CTA from '@app/components/CTA';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';

import testIds from '@app/utils/test-ids';

export default function Home() {
  return (
    <div className="mx-auto relative sm:px-20 py-2.5">
      <Hero />
      <NewsCarousel />
      <Benefits />
      <Testimonials />
      <CTA />
    </div>
  );
}
