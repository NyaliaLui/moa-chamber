import Image from 'next/image';
import Link from 'next/link';

import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';

import { SOCIAL_MEDIA_URLS, WixImage } from '@app/constants';

export interface StaffCardProps {
  name: string;
  image: WixImage;
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
  return (
    <div className="flex flex-col text-center">
      <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
        <Image
          src={image.url}
          alt={role}
          className="aspect-square size-full object-cover"
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">{name}</h5>
        <h6 className="md:text-md">{role}</h6>
        <h6 className="md:text-md">{email}</h6>
      </div>
      <p>{bio}</p>
      <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center">
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
