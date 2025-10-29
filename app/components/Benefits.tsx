'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';
import { PLACEHOLDER_IMAGE } from '@app/constants';

const BenfitsCard = ({
  heading,
  desc,
  label,
}: {
  heading: string;
  desc: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col border border-border-primary">
      <div className="flex w-full flex-col items-center justify-center self-start">
        <Image
          src={PLACEHOLDER_IMAGE}
          alt={`Benefits ${label} img`}
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <div>
          <p className="mb-2 font-semibold">{label}</p>
          <h2 className="mb-3 text-xl font-bold md:mb-4 md:leading-[1.3]">
            {heading}
          </h2>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  return (
    <section className="px-[5%] mt-16">
      <div className="container">
        <div className="mx-auto mb-6 w-full max-w-lg text-center md:mb-9 lg:mb-10">
          <h1 className="mb-5 text-2xl font-bold md:mb-6">
            Benefits of Chamber Membership
          </h1>
          <p className="text-md">
            Strategic support for local entrepreneurs and business owners
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          <BenfitsCard
            heading="Amplify your business visibility"
            desc="Showcase your brand through chamber-sponsored events"
            label="Promote"
          />
          <BenfitsCard
            heading="Build powerful business relationships"
            desc="Create meaningful partnerships that drive local economic growth"
            label="Connect"
          />
          <BenfitsCard
            heading="Contribute to community development"
            desc="Make a lasting impact through collaborative local initiatives"
            label="Serve"
          />
        </div>
      </div>
      <div className="my-4 justify-center items-center gap-4 md:mt-8">
        <Button color="dark" size="lg" data-testid="benefits-join-btn">
          Join the chamber
        </Button>
      </div>
    </section>
  );
};

export default Benefits;
