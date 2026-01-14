'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import testIds from '@app/test-ids';
import { WixImage } from '@app/constants';

export interface MemberCardProps {
  media: WixImage;
  name: string;
  address: string;
  slug: string;
}

const MemberCard = ({ media, name, address, slug }: MemberCardProps) => {
  return (
    <Link
      href={`/directory/${slug}`}
      className="block text-center font-semibold md:text-md text-black hover:text-gray-800 overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-300 rounded-lg bg-gray-100"
      data-testid={testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER}
    >
      <div className="aspect-5/6 rounded-t-lg overflow-hidden">
        <Image
          src={media.url}
          alt={name}
          className="size-full object-center aspect-video"
          width={media.width}
          height={media.height}
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3>{name}</h3>
          <div className="text-sm font-normal">{address}</div>
        </div>
        <div
          className="text-base md:text-lg"
          data-testid={testIds.PROJECTS_PAGE.PROJECT_ITEM_CTA}
        >
          Find out more
        </div>
      </div>
    </Link>
  );
};

export default MemberCard;
