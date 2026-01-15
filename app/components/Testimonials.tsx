'use client';

import React from 'react';
import Image from 'next/image';
import { BiSolidStar } from 'react-icons/bi';
import { WixImage, DEFAULT_TESTIMONIAL_STARS } from '@app/constants';
import testIds from '@app/test-ids';

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  businessName: string;
  businessRole: string;
  image: WixImage;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div
      className="flex w-full flex-col items-start justify-between border border-white/60 rounded-lg p-6 lg:p-8"
      data-testid={testIds.TESTIMONIALS.CARD}
    >
      <div className="rb-5 mb-5 lg:mb-6">
        <div className="mb-5 flex lg:mb-6">
          {Array.from({ length: DEFAULT_TESTIMONIAL_STARS }, (_, index) => (
            <BiSolidStar key={index} className="mr-1 size-6 text-white" />
          ))}
        </div>
        <blockquote className="text-base text-white">
          {testimonial.quote}
        </blockquote>
      </div>
      <div className="mt-5 flex w-full flex-col items-start lg:mt-6 lg:w-fit lg:flex-row lg:items-center">
        <Image
          src={testimonial.image.url}
          alt={`Testimonial ${testimonial.businessName} img`}
          className="mb-4 size-12 min-h-12 min-w-12 rounded-full object-cover lg:mb-0 lg:mr-4"
          width={testimonial.image.width}
          height={testimonial.image.height}
        />
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-white">
            {testimonial.businessRole}, {testimonial.businessName}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({
  testimonialsData,
}: {
  testimonialsData: Testimonial[];
}) => {
  return (
    <section className="w-full py-16 bg-[#1a56db]">
      <div className="container px-[5%] mx-auto">
        <div className="mx-auto mb-6 w-full max-w-lg text-center lg:mb-9 xl:mb-10">
          <h1 className="text-2xl font-bold text-white">Member stories</h1>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
