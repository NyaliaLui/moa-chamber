'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BusinessCard from '@app/components/Resources/BusinessCard';

export interface Business {
  name: string;
  description: string;
  website: string;
  image: string;
}

interface BusinessBoxProps {
  businessesData: Business[];
}

const BusinessBox = ({ businessesData }: BusinessBoxProps) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(
    businessesData[0],
  );

  if (!businessesData || businessesData.length === 0) {
    return null;
  }

  return (
    <div className="grid auto-cols-fr grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="flex flex-col lg:col-span-1">
        {businessesData.map((business, index) => (
          <div
            key={index}
            onClick={() => setSelectedBusiness(business)}
            className="cursor-pointer hover:scale-105"
          >
            <BusinessCard
              name={business.name}
              description={business.description}
              href={business.website}
              isSelected={selectedBusiness === business}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center lg:col-span-2">
        <Image
          src={selectedBusiness.image}
          className="w-full h-full object-contain aspect-square"
          alt={selectedBusiness.name}
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default BusinessBox;
