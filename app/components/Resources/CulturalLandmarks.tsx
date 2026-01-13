'use client';

import React, { useState } from 'react';
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

interface CulturalLandmarksProps {
  tabsData: TabContent[];
}

const CulturalLandmarks = ({ tabsData }: CulturalLandmarksProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0]?.id || '');

  const activeContent =
    tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  if (!tabsData || tabsData.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {tabsData.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-5 lg:py-8 text-xs lg:text-sm font-medium border-gray-300 transition-all ${
              activeTab === tab.id
                ? 'bg-gray-300 text-black border-t border-l border-r'
                : 'bg-white text-gray-800 border'
            } ${index === 0 ? 'rounded-tl-lg lg:rounded-tr-none' : ''} ${
              index === 1 ? 'rounded-tr-lg lg:rounded-tr-none' : ''
            } ${index === tabsData.length - 1 ? 'lg:rounded-tr-lg' : ''}`}
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
    </>
  );
};

export default CulturalLandmarks;
