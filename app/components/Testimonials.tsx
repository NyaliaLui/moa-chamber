'use client';

import React from 'react';
import Image from 'next/image';
import { BiSolidStar } from 'react-icons/bi';
import { WixImage } from '@app/constants';

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
    <div className="flex w-full flex-col items-start justify-between border bg-gray-100 border-gray-300 p-6 md:p-8">
      <div className="rb-5 mb-5 md:mb-6">
        <div className="mb-5 flex md:mb-6">
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
        </div>
        <blockquote className="text-md">{testimonial.quote}</blockquote>
      </div>
      <div className="mt-5 flex w-full flex-col items-start md:mt-6 md:w-fit md:flex-row md:items-center">
        <Image
          src={testimonial.image.url}
          alt={`Testimonial ${testimonial.businessName} img`}
          className="mb-4 size-12 min-h-12 min-w-12 rounded-full object-cover md:mb-0 md:mr-4"
          width={testimonial.image.width}
          height={testimonial.image.height}
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p>
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
    <section className="px-[5%] mt-16">
      <div className="container">
        <div className="mx-auto mb-6 w-full max-w-lg text-center md:mb-9 lg:mb-10">
          <h1 className="text-2xl font-bold">Member stories</h1>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
