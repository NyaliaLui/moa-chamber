'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';

import testIds from '@app/test-ids';
import { WixImage } from '@app/constants';

interface CultureBoxProps {
  heading: string;
  description: string;
  ctaLink: string;
  ctaLabel: string;
  image: WixImage;
  imageAlt?: string;
}

const CultureBox = ({
  heading,
  description,
  ctaLink,
  ctaLabel,
  image,
  imageAlt = 'Culture box image',
}: CultureBoxProps) => {
  return (
    <div
      className="grid auto-cols-fr grid-cols-1 border-b border-l border-r rounded-b-lg bg-gray-300 border-gray-300 lg:grid-cols-2 text-black"
      data-testid={testIds.RESOURCES.CULTURE_BOX}
    >
      <div className="flex flex-col justify-center items-start p-5 md:p-12">
        <h2 className="mb-3 md:mb-6 text-lg lg:text-xl md:text-2xl font-bold">
          {heading}
        </h2>
        <p className="mb-6 md:mb-8 text-sm md:text-base">{description}</p>
        <div className="w-full flex justify-center md:justify-start">
          <Button
            size="lg"
            href={ctaLink}
            className="bg-black text-white hover:bg-gray-800 text-sm lg:text-base"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center md:px-8 md:py-8">
        <Image
          src={image.url}
          className="w-full object-cover aspect-video rounded-lg"
          alt={imageAlt}
          width={image.width}
          height={image.height}
        />
      </div>
    </div>
  );
};

export default CultureBox;
