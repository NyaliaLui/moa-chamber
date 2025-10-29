'use client';

import React from 'react';
import Image from 'next/image';
import { BiSolidStar } from 'react-icons/bi';

import { PLACEHOLDER_IMAGE } from '@app/constants';

const TestimonialCard = ({
  quote,
  name,
  businessName,
  businessRole,
}: {
  quote: string;
  name: string;
  businessName: string;
  businessRole: string;
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-between border border-border-primary p-6 md:p-8">
      <div className="rb-5 mb-5 md:mb-6">
        <div className="mb-5 flex md:mb-6">
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
          <BiSolidStar className="mr-1 size-6" />
        </div>
        <blockquote className="text-md">{quote}</blockquote>
      </div>
      <div className="mt-5 flex w-full flex-col items-start md:mt-6 md:w-fit md:flex-row md:items-center">
        <Image
          src={PLACEHOLDER_IMAGE}
          alt={`Testimonial ${businessName} img`}
          className="mb-4 size-12 min-h-12 min-w-12 rounded-full object-cover md:mb-0 md:mr-4"
          width={1000}
          height={1000}
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p>
            {businessRole}, {businessName}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="px-[5%] mt-16">
      <div className="container">
        <div className="mx-auto mb-6 w-full max-w-lg text-center md:mb-9 lg:mb-10">
          <h1 className="text-2xl font-bold">Member stories</h1>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote="The chamber helped me connect with key local partners and grow my business."
            name="Jane Doe"
            businessName="Jane Consulting"
            businessRole="Owner"
          />
          <TestimonialCard
            quote="Joining the chamber was the best decision for my small business networking."
            name="John Smith"
            businessName="Green Prairie Farms"
            businessRole="Founder"
          />
          <TestimonialCard
            quote="The resources and support have been invaluable to our local business community."
            name="Madison Anderson"
            businessName="Anderson Hardware"
            businessRole="Manager"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
