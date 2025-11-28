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
      className="text-center font-semibold md:text-md"
      data-testid={testIds.PROJECTS_PAGE.PROJECT_ITEM_CONTAINER}
    >
      <div className="mb-3 aspect-5/6 md:mb-4">
        <Image
          src={media.url}
          alt={name}
          className="size-full object-cover"
          width={media.width}
          height={media.height}
        />
      </div>
      <div className="mb-2">
        <h3>{name}</h3>
        <div className="text-sm font-normal">{address}</div>
      </div>
      <div
        className="text-md md:text-lg"
        data-testid={testIds.PROJECTS_PAGE.PROJECT_ITEM_CTA}
      >
        Find out more
      </div>
    </Link>
  );
};

export default MemberCard;
