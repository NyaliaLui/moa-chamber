'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';
import { WixImage } from '@app/constants';

const Hero = ({ image }: { image: WixImage }) => {
  return (
    <div className="relative w-full h-dvh">
      {/* Background Image - Full Width */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image.url}
          className="w-full h-full object-cover"
          alt="Hero image"
          width={image.width}
          height={image.height}
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content - Centered */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-8 pt-5 max-xl:landscape:pt-20 max-xl:landscape:pb-2 xl:pt-0">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="mb-6 xl:mb-8 font-bold text-4xl xl:text-5xl 2xl:text-6xl text-white">
            Empowering businesses in Meriden and Ozawkie
          </h1>
          <p className="text-xl xl:text-2xl 2xl:text-3xl text-white mb-8 xl:mb-10">
            We connect local entrepreneurs and support economic growth. Join our
            community and unlock opportunities for your business.
          </p>

          {/* Buttons - Row with Even Spacing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:gap-6">
            <Button
              size="lg"
              className="text-white! w-full sm:w-auto"
              href="/join"
            >
              Join Us
            </Button>
            <Button
              color="dark"
              size="lg"
              outline
              className="text-white! hover:text-black! border-white! hover:border-white! hover:bg-white shadow-none! w-full sm:w-auto"
              href="/about"
            >
              Who we are
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
