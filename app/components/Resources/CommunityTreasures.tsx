'use client';

import { useState } from 'react';
import testIds from '@app/test-ids';
import CultureBox from '@app/components/Resources/CultureBox';
import { WixImage } from '@app/constants';

export interface TabContent {
  id: string;
  heading: string;
  description: string;
  ctaLink: string;
  ctaLabel: string;
  image: WixImage;
}

export default function CommunityTreasures({
  cultureResources,
}: {
  cultureResources: TabContent[];
}) {
  const [activeTab, setActiveTab] = useState<string>(
    cultureResources[0]?.id || '',
  );

  const activeContent =
    cultureResources.find((tab) => tab.id === activeTab) || cultureResources[0];

  if (!cultureResources || cultureResources.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className="flex flex-col items-start"
        data-testid={testIds.RESOURCES.HEADING}
      >
        <div className="mx-auto mb-6 lg:mb-10">
          <h2 className="mb-5 text-center text-lg lg:text-3xl font-bold lg:mb-6">
            Discover community treasures
          </h2>
          <p className="text-center text-sm lg:text-base max-w-lg">
            Explore the hidden gems and landmarks that tell the story of Meriden
            and Ozawkie. Each location offers a unique glimpse into our
            community&apos;s spirit.
          </p>
        </div>
      </div>
      <div className="container mt-16 mb-24">
        <div className="grid grid-cols-2 xl:grid-cols-4">
          {cultureResources.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-5 xl:py-8 text-xs xl:text-sm font-medium border-gray-300 transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-300 text-black border-t border-l border-r'
                  : 'bg-white text-gray-800 border'
              } ${index === 0 ? 'rounded-tl-lg xl:rounded-tr-none' : ''} ${
                index === 1 ? 'rounded-tr-lg xl:rounded-tr-none' : ''
              } ${index === cultureResources.length - 1 ? 'xl:rounded-tr-lg' : ''}`}
              data-testid={`culture-tab-${tab.id}`}
            >
              {tab.heading}
            </button>
          ))}
        </div>
        <CultureBox
          heading={activeContent.heading}
          description={activeContent.description}
          ctaLink={activeContent.ctaLink}
          ctaLabel={activeContent.ctaLabel}
          image={activeContent.image}
          imageAlt={activeContent.heading}
        />
      </div>
    </>
  );
}
