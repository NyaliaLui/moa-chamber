import Image from 'next/image';
import Link from 'next/link';

import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';

import { getImageUrlForMedia } from '@app/components/Image/WixMediaImage';

const StaffCard = ({
  name,
  image,
  role,
  email,
  bio,
  linkedIn,
  twitter,
}: {
  name: string;
  image: string;
  role: string;
  email: string;
  bio: string;
  linkedIn: string;
  twitter: string;
}) => {
  const imgInfo = {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    width: 70,
    height: 36,
  };

  if (image.startsWith('wix:image://v1')) {
    imgInfo.src = getImageUrlForMedia(image, 256, 128);
    imgInfo.width = 256;
    imgInfo.height = 128;
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
        <Link href={`https://www.linkedin.com/in/${linkedIn}/`}>
          <BiLogoLinkedinSquare className="size-6" />
        </Link>
        <Link href={`https://x.com/${twitter}`}>
          <FaXTwitter className="size-6 p-0.5" />
        </Link>
      </div>
    </div>
  );
};

export default StaffCard;
