'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';
import { WixImage } from '@app/constants';

const Hero = ({ image }: { image: WixImage }) => {
  return (
    <>
      <div className="px-[5%] container">
        <div className="grid auto-cols-fr grid-cols-1 border lg:grid-cols-2 bg-gray-100 border-gray-300">
          <div className="flex text-2xl flex-col justify-center p-8 md:p-12">
            <h1 className="mb-5 font-bold md:mb-6">
              Empowering businesses in Meriden and Ozawkie
            </h1>
            <p className="text-xlg">
              We connect local entrepreneurs and support economic growth. Join
              our community and unlock opportunities for your business.
            </p>
            <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center">
              <Button size="lg" href="/join" className="w-full md:w-auto">
                Join Us
              </Button>
              <Button
                color="dark"
                size="lg"
                outline
                href="/about"
                className="w-full md:w-auto"
              >
                Who we are
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={image.url}
              className="w-full object-cover"
              alt="Hero image"
              width={image.width}
              height={image.height}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
