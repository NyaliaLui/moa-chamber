'use client';

import { useState } from 'react';
import Image from 'next/image';
import testIds from '@app/test-ids';
import BusinessCard from '@app/components/Resources/BusinessCard';
import { WixImage } from '@app/constants';

export interface Business {
  name: string;
  description: string;
  website: string;
  image: WixImage;
}

export default function InfluentialBusinesses({
  businessResources,
}: {
  businessResources: Business[];
}) {
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(
    businessResources[0],
  );

  if (!businessResources || businessResources.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className="mx-auto mb-6 lg:mb-10"
        data-testid={testIds.RESOURCES.BUSINESSES_HEADING}
      >
        <h2 className="mb-5 text-center text-lg lg:text-3xl font-bold lg:mb-6">
          Influencial businesses and organizations
        </h2>
        <p className="text-center text-sm lg:text-base">
          Discover the establishments with a history of supporting our
          community.
        </p>
      </div>
      <div className="container mt-16">
        <div
          className="grid auto-cols-fr grid-cols-1 xl:grid-cols-3 gap-6"
          data-testid={testIds.RESOURCES.BUSINESS_BOX}
        >
          <div className="flex flex-col xl:col-span-1">
            {businessResources.map((business, index) => (
              <div
                key={index}
                onClick={() => setSelectedBusiness(business)}
                className="cursor-pointer xl:hover:scale-105"
              >
                <div className="hidden xl:block">
                  <BusinessCard
                    name={business.name}
                    description={business.description}
                    href={business.website}
                    isSelected={selectedBusiness === business}
                  />
                </div>
                <div className="xl:hidden overflow-hidden">
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
          <div className="flex items-center justify-center xl:col-span-2">
            <Image
              src={selectedBusiness.image.url}
              className="w-full h-full object-center rounded-lg aspect-video"
              alt={selectedBusiness.name}
              width={selectedBusiness.image.width}
              height={selectedBusiness.image.height}
            />
          </div>
        </div>
      </div>
    </>
  );
}
