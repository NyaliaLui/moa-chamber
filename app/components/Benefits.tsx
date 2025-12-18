'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';

import testIds from '@app/test-ids';
import { WixImage } from '@app/constants';

export interface Benefit {
  id: string;
  heading: string;
  description: string;
  label: string;
  image: WixImage;
}

const BenefitCard = ({ benefit }: { benefit: Benefit }) => {
  return (
    <div className="flex flex-col border bg-gray-100 border-gray-300 rounded-lg overflow-hidden">
      <div className="flex w-full flex-col items-center justify-center self-start">
        <Image
          src={benefit.image.url}
          alt={`Benefits ${benefit.label} img`}
          width={benefit.image.width}
          height={benefit.image.height}
          className="w-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <div>
          <p className="mb-2 font-semibold">{benefit.label}</p>
          <h2 className="mb-3 text-xl font-bold md:mb-4 md:leading-[1.3]">
            {benefit.heading}
          </h2>
          <p>{benefit.description}</p>
        </div>
      </div>
    </div>
  );
};

const Benefits = ({ benefitsData }: { benefitsData: Benefit[] }) => {
  return (
    <section className="w-full py-16 bg-[#0e2647]">
      <div className="container px-[5%] mx-auto">
        <div className="mx-auto mb-6 w-full max-w-lg text-center md:mb-9 lg:mb-10">
          <h1 className="mb-5 text-2xl font-bold md:mb-6 text-white">
            Benefits of Chamber Membership
          </h1>
          <p className="text-base text-white">
            Strategic support for local entrepreneurs and business owners
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {benefitsData.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
        <div className="my-4 flex justify-center items-center gap-4 md:mt-8">
          <Button
            color="dark"
            size="lg"
            outline
            className="text-white! hover:text-black! border-white! hover:border-white! hover:bg-white shadow-none!"
            data-testid={testIds.BENEFITS.JOIN_BTN}
          >
            Join the chamber
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
