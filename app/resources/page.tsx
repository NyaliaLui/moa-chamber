'use client';

import CulturalLandmarks from '@app/components/Resources/CulturalLandmarks';
import HistoricalBusinesses from '@app/components/Resources/HistoricalBusinesses';
import CTA from '@app/components/CTA';
import {
  useWixCultureResources,
  useWixBusinessResources,
} from '@app/hooks/Wix';
import testIds from '@app/test-ids';

export default function Resources() {
  const {
    data: cultureResources,
    isLoading: cultureLoading,
    error: cultureError,
  } = useWixCultureResources();
  const {
    data: businessResources,
    isLoading: businessLoading,
    error: businessError,
  } = useWixBusinessResources();

  const isLoading = cultureLoading || businessLoading;
  const error = cultureError || businessError;

  if (isLoading) {
    return (
      <section className="px-[5%] mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-[5%] mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg text-red-600">Error: {error.message}</p>
        </div>
      </section>
    );
  }

  if (!cultureResources || !businessResources) {
    return (
      <section className="px-[5%] mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg text-red-600">Error: resources are undefined</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-[5%] mt-16">
      <div className="container" data-testid={testIds.RESOURCES.CONTAINER}>
        <div
          className="flex flex-col items-start"
          data-testid={testIds.RESOURCES.HEADING}
        >
          <div className="mx-auto mb-6 max-w-lg md:mb-9 lg:mb-10">
            <h2 className="mb-5 text-center text-3xl font-bold md:mb-6">
              Discover community treasures
            </h2>
            <p className="text-center md:text-md">
              Explore the hidden gems and landmarks that tell the story of
              Meriden and Ozawkie. Each location offers a unique glimpse into
              our community&apos;s spirit.
            </p>
          </div>
        </div>
        <div className="container mt-16 mb-24">
          <CulturalLandmarks tabsData={cultureResources} />
        </div>
        <div className="container">
          <div
            className="mb-12 max-w-lg text-left md:mb-18 lg:mb-20"
            data-testid={testIds.RESOURCES.BUSINESSES_HEADING}
          >
            <h1 className="rb-5 mb-5 text-3xl font-bold md:mb-6">
              Influencial businesses and organizations
            </h1>
            <p className="md:text-md">
              Discover the establishments with a history of supporting our
              community.
            </p>
          </div>
          <HistoricalBusinesses businessesData={businessResources} />
        </div>
      </div>
      <CTA />
    </section>
  );
}
