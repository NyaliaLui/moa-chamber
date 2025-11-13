'use client';

import { RxChevronRight } from 'react-icons/rx';
import Link from 'next/link';
import Image from 'next/image';

import testIds from '@app/utils/test-ids';

const NewsCard = ({
  image,
  heading,
  description,
  slug,
  readTimeM,
}: {
  image: string;
  heading: string;
  description: string;
  slug: string;
  readTimeM: number;
}) => {
  return (
    <div
      className="grid gap-x-8 gap-y-6 md:grid-cols-[.75fr_1fr] md:gap-y-4"
      data-testid={testIds.NEWS_PAGE.NEWS_ITEM_CONTAINER}
    >
      <Link href="#" className="w-full">
        <Image
          src={image}
          alt={heading}
          className="aspect-square w-full object-cover"
          width={1280}
          height={720}
        />
      </Link>
      <div className="flex h-full flex-col items-start justify-start">
        <div className="rb-4 mb-3 flex w-full items-center justify-start md:mb-4">
          <p className="inline text-sm font-semibold">{readTimeM}min read</p>
        </div>
        <Link className="mb-2" href="#">
          <h3 className="text-xl font-bold md:text-2xl">{heading}</h3>
        </Link>
        <p>{description}</p>
        <Link
          href={`/news/${slug}`}
          className="px-3 mt-5 flex items-center justify-center gap-x-2 md:mt-6 bg-gray-900 border border-white rounded-lg hover:bg-gray-800 transition-colors"
          data-testid={testIds.NEWS_PAGE.NEWS_ITEM_CTA}
        >
          <p className="text-white">Read more</p>
          <RxChevronRight className="text-white" />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
