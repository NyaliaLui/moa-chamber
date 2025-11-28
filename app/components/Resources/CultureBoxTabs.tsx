'use client';

import React, { useState } from 'react';
import CultureBox from '@app/components/Resources/CultureBox';
import { WixImage } from '@app/constants';

export interface TabContent {
  id: string;
  name: string;
  heading: string;
  description: string;
  ctaLink: string;
  ctaLabel: string;
  image: WixImage;
}

interface CultureBoxTabsProps {
  tabsData: TabContent[];
}

const CultureBoxTabs = ({ tabsData }: CultureBoxTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0]?.id || '');

  const activeContent =
    tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  if (!tabsData || tabsData.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-8 text-sm font-medium border-gray-300 transition-all ${
              activeTab === tab.id
                ? 'bg-gray-300 text-black border-t border-l border-r'
                : 'bg-white text-gray-900 border'
            }`}
            data-testid={`culture-tab-${tab.id}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <CultureBox
        heading={activeContent.heading}
        description={activeContent.description}
        ctaLink={activeContent.ctaLink}
        ctaLabel={activeContent.ctaLabel}
        image={activeContent.image}
        imageAlt={activeContent.name}
      />
    </>
  );
};

export default CultureBoxTabs;
