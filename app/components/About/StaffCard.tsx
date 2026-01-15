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
    <div className="flex flex-col text-center border border-gray-300 rounded-lg bg-gray-100">
      <div className="rb-5 mb-5 flex w-full items-center justify-center lg:mb-6 rounded-t-lg overflow-hidden">
        <Image
          src={image.url}
          alt={role}
          className="aspect-square size-full object-cover"
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="p-4">
        <div className="mb-3 lg:mb-4">
          <h5 className="text-base font-semibold lg:text-lg text-black">
            {name}
          </h5>
          <h6 className="text-sm lg:text-base text-black">{role}</h6>
          <h6 className="text-sm lg:text-base text-black">{email}</h6>
        </div>
        <p className="text-sm lg:text-base text-black">{bio}</p>
        <div className="mt-6 flex justify-center gap-5 items-center">
          <Link
            href={`${SOCIAL_MEDIA_URLS.linkedIn}${linkedIn}/`}
            className="text-black hover:text-gray-800 transition-colors"
          >
            <BiLogoLinkedinSquare className="size-6" />
          </Link>
          <Link
            href={`${SOCIAL_MEDIA_URLS.twitter}${twitter}`}
            className="text-black hover:text-gray-800 transition-colors"
          >
            <FaXTwitter className="size-6 p-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
