'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import testIds from '@app/test-ids';
import { DateDisplay } from '@app/components/News/DateDisplay';
import { WixImage } from '@app/constants';

export interface NewsCarouselCardProps {
  image: WixImage;
  heading: string;
  subHeading: string;
  authorImage: WixImage;
  authorName: string;
  publishDate: string;
  readTime: string;
  href: string;
}

export const NewsCarouselCard = ({
  image,
  heading,
  subHeading,
  authorImage,
  authorName,
  publishDate,
  readTime,
  href,
}: NewsCarouselCardProps) => {
  return (
    <Link href={href} className="block h-full group">
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <Image
            src={image.url}
            alt={heading}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-4 pt-6">
          <h3 className="text-lg lg:text-xl font-bold">{heading}</h3>
          <p className="text-md lg:text-lg text-gray-600">{subHeading}</p>
          <div
            className="flex items-start gap-3 mt-2"
            data-testid={testIds.HOME_PAGE.NEWS_CAROUSEL_CARD_AUTHOR}
          >
            <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden shrink-0">
              <Image
                src={authorImage.url}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 text-xs lg:text-sm">
              <span className="font-medium">{authorName}</span>
              <div className="flex items-center gap-2 text-gray-600">
                <DateDisplay dateString={publishDate} />
                <span>•</span>
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCarouselCard;
