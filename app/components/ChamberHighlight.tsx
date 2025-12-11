'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaExternalLinkAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import { Highlight } from '@app/hooks/Wix';

const getSocialIcon = (url: string) => {
  const lowerUrl = url.toLowerCase();
  const className = 'w-4 h-4 lg:w-6 lg:h-6';
  if (lowerUrl.includes('facebook.com')) {
    return <FaFacebook className={className} />;
  } else if (lowerUrl.includes('instagram.com')) {
    return <FaInstagram className={className} />;
  } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
    return <FaXTwitter className={className} />;
  } else if (lowerUrl.includes('linkedin.com')) {
    return <FaLinkedin className={className} />;
  }
  return null;
};

const getSocialLabel = (url: string) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('facebook.com')) return 'Facebook';
  if (lowerUrl.includes('instagram.com')) return 'Instagram';
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com'))
    return 'Twitter';
  if (lowerUrl.includes('linkedin.com')) return 'LinkedIn';
  return 'Social Media';
};

export default function ChamberHighlight({
  highlightData,
}: {
  highlightData: Highlight;
}) {
  return (
    <section className="container px-4 mt-16">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
        New member highlight
      </h3>
      <div className="p-1 lg:p-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left column - 2/3 of the space */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl lg:text-4xl font-bold">
            {highlightData.heading}
          </h2>
          <p className="text-sm lg:text-base">{highlightData.description}</p>

          {highlightData.website && (
            <Link
              href={highlightData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-sm lg:text-base items-center gap-2 text-gray-600 hover:text-black transition-colors w-fit"
            >
              <span>Visit Website</span>
              <FaExternalLinkAlt className="w-3 h-3 lg:w-4 lg:h-4" />
            </Link>
          )}

          {highlightData.socialMediaHandles &&
            highlightData.socialMediaHandles.length > 0 && (
              <div className="flex gap-4">
                {highlightData.socialMediaHandles.map((url, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                    aria-label={getSocialLabel(url)}
                  >
                    {getSocialIcon(url)}
                  </Link>
                ))}
              </div>
            )}
        </div>

        {/* Right column - 1/3 of the space */}
        <div className="">
          <div className="relative w-full">
            <Image
              src={highlightData.image.url}
              alt={highlightData.heading}
              width={highlightData.image.width}
              height={highlightData.image.height}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
