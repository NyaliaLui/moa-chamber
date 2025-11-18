'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';

import { PLACEHOLDER_IMAGE } from '@app/constants';

const Hero = () => {
  return (
    <section className="px-[5%]">
      <div className="container">
        <div className="grid auto-cols-fr grid-cols-1 border border-border-primary lg:grid-cols-2">
          <div className="flex text-2xl flex-col justify-center p-8 md:p-12">
            <h1 className="mb-5 font-bold md:mb-6">
              Empowering businesses in Meriden and Ozawkie
            </h1>
            <p className="text-xlg">
              We connect local entrepreneurs and support economic growth. Join
              our community and unlock opportunities for your business.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button size="lg" href="/join">
                Join Us
              </Button>
              <Button color="dark" size="lg" outline href="/about">
                Who we are
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={PLACEHOLDER_IMAGE}
              className="w-full object-cover"
              alt="Hero image"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
