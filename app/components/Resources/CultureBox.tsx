'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from 'flowbite-react';

interface CultureBoxProps {
  heading: string;
  description: string;
  ctaLink: string;
  ctaLabel: string;
  image: string;
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
    <div className="grid auto-cols-fr grid-cols-1 border-b border-l border-r border-gray-300 bg-gray-300 lg:grid-cols-2">
      <div className="flex flex-col justify-center items-start p-8 md:p-12">
        <h2 className="mb-5 text-2xl font-bold md:mb-6">{heading}</h2>
        <p className="text-md mb-6 md:mb-8">{description}</p>
        <Button size="lg" color="dark" outline href={ctaLink}>
          {ctaLabel}
        </Button>
      </div>
      <div className="flex items-center justify-center px-8 py-8">
        <Image
          src={image}
          className="w-full object-contain aspect-video"
          alt={imageAlt}
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default CultureBox;
