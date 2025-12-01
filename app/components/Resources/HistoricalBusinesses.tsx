'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BusinessCard from '@app/components/Resources/BusinessCard';
import { WixImage } from '@app/constants';
import testIds from '@app/test-ids';

export interface Business {
  name: string;
  description: string;
  website: string;
  image: WixImage;
}

interface HistoricalBusinessesProps {
  businessesData: Business[];
}

const HistoricalBusinesses = ({
  businessesData,
}: HistoricalBusinessesProps) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(
    businessesData[0],
  );

  if (!businessesData || businessesData.length === 0) {
    return null;
  }

  return (
    <div
      className="grid auto-cols-fr grid-cols-1 lg:grid-cols-3 gap-6"
      data-testid={testIds.RESOURCES.BUSINESS_BOX}
    >
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
          src={selectedBusiness.image.url}
          className="w-full h-full object-contain aspect-square md:aspect-video"
          alt={selectedBusiness.name}
          width={selectedBusiness.image.width}
          height={selectedBusiness.image.height}
        />
      </div>
    </div>
  );
};

export default HistoricalBusinesses;
