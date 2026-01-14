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
            className="cursor-pointer lg:hover:scale-105"
          >
            <div className="hidden lg:block">
              <BusinessCard
                name={business.name}
                description={business.description}
                href={business.website}
                isSelected={selectedBusiness === business}
              />
            </div>
            <div className="lg:hidden overflow-hidden">
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  selectedBusiness === business
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <BusinessCard
                    name={business.name}
                    description={business.description}
                    href={business.website}
                    isSelected={true}
                  />
                </div>
              </div>
              <div
                className={`flex items-center gap-3 py-2 transition-all duration-300 ease-in-out ${
                  selectedBusiness === business
                    ? 'h-0 opacity-0 py-0'
                    : 'h-auto opacity-100'
                }`}
              >
                <span className="text-white text-xl font-light">+</span>
                <div className="flex-1 h-[1.5px] bg-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center lg:col-span-2">
        <Image
          src={selectedBusiness.image.url}
          className="w-full h-full object-center rounded-lg aspect-video"
          alt={selectedBusiness.name}
          width={selectedBusiness.image.width}
          height={selectedBusiness.image.height}
        />
      </div>
    </div>
  );
};

export default HistoricalBusinesses;
