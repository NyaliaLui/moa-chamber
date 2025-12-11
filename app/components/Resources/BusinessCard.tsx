'use client';

import React from 'react';
import Link from 'next/link';

const stripHttps = (href: string) => {
  return href.replace(/^https?:\/\//, '');
};

interface BusinessCardProps {
  name: string;
  description: string;
  href: string;
  isSelected?: boolean;
}

const BusinessCard = ({
  name,
  description,
  href,
  isSelected = false,
}: BusinessCardProps) => {
  return (
    <div
      className={`flex flex-col items-start p-6 text-white ${
        isSelected ? 'border-l-2 border-l-gray-300' : ''
      }`}
      data-testid={name}
    >
      <h3 className="mb-3 text-xl font-bold">{name}</h3>
      <p className="text-sm mb-4">{description}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm hover:text-gray-200"
      >
        {stripHttps(href)}
      </Link>
    </div>
  );
};

export default BusinessCard;
