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
      className="grid auto-cols-fr grid-cols-1 border-b border-l border-r rounded-b-lg bg-gray-300 border-gray-300 xl:grid-cols-2 text-black"
      data-testid={testIds.RESOURCES.CULTURE_BOX}
    >
      <div className="flex flex-col justify-center items-start p-5 lg:p-12">
        <h2 className="mb-3 lg:mb-6 text-lg xl:text-xl lg:text-2xl font-bold">
          {heading}
        </h2>
        <p className="mb-6 lg:mb-8 text-sm lg:text-base">{description}</p>
        <div className="w-full flex justify-center lg:justify-start">
          <Button
            size="lg"
            href={ctaLink}
            className="bg-black text-white hover:bg-gray-800 text-sm xl:text-base"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center lg:px-8 lg:py-8">
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
