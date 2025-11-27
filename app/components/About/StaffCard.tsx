import Image from 'next/image';
import Link from 'next/link';

import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';

import { getImageUrlForMedia } from '@app/hooks/Wix';
import {
  CLOUDFRONT_PLACEHOLDER_IMAGE,
  WIX_IMAGE_PREFIX,
  IMAGE_DIMENSIONS,
  SOCIAL_MEDIA_URLS,
} from '@app/constants';

export interface StaffCardProps {
  name: string;
  image: string;
  role: string;
  email: string;
  bio: string;
  linkedIn: string;
  twitter: string;
}

const StaffCard = ({
  name,
  image,
  role,
  email,
  bio,
  linkedIn,
  twitter,
}: StaffCardProps) => {
  const imgInfo = {
    src: CLOUDFRONT_PLACEHOLDER_IMAGE,
    width: IMAGE_DIMENSIONS.placeholder.width,
    height: IMAGE_DIMENSIONS.placeholder.height,
  };

  if (image.startsWith(WIX_IMAGE_PREFIX)) {
    imgInfo.src = getImageUrlForMedia(image);
    imgInfo.width = IMAGE_DIMENSIONS.staffCard.width;
    imgInfo.height = IMAGE_DIMENSIONS.staffCard.height;
  }

  return (
    <div className="flex flex-col text-center">
      <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
        <Image
          src={imgInfo.src}
          alt={role}
          className="aspect-square size-full object-cover"
          width={imgInfo.width}
          height={imgInfo.height}
        />
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">{name}</h5>
        <h6 className="md:text-md">{role}</h6>
        <h6 className="md:text-md">{email}</h6>
      </div>
      <p>{bio}</p>
      <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-center">
        <Link href={`${SOCIAL_MEDIA_URLS.linkedIn}${linkedIn}/`}>
          <BiLogoLinkedinSquare className="size-6" />
        </Link>
        <Link href={`${SOCIAL_MEDIA_URLS.twitter}${twitter}`}>
          <FaXTwitter className="size-6 p-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default StaffCard;
