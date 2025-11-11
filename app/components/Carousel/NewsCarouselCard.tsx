'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsCarouselCardProps {
  image: string;
  heading: string;
  description: string;
  href: string;
}

const NewsCarouselCard = ({
  image,
  heading,
  description,
  href,
}: NewsCarouselCardProps) => {
  return (
    <Link href={href} className="block h-full group">
      <div className="flex flex-col h-full">
        <div className="relative w-full flex-[2] min-h-0 overflow-hidden">
          <Image
            src={image}
            alt={heading}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-3 pt-6 md:pt-8 pl-6 md:pl-8 flex-[1]">
          <h3 className="text-2xl font-bold md:text-3xl lg:text-4xl group-hover:underline">
            {heading}
          </h3>
          <p className="text-base md:text-lg text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCarouselCard;
