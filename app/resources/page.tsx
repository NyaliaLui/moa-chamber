import CultureBoxTabs from '@app/components/Resources/CultureBoxTabs';
import BusinessBox from '@app/components/Resources/BusinessBox';
import CTA from '@app/components/CTA';
import { wix } from '@app/hooks/Wix';

export default async function Resources() {
  const { collections } = await wix();

  return (
    <section className="px-[5%] mt-16">
      <div className="container" data-testid="community-resources-demo">
        <div
          className="flex flex-col items-start"
          data-testid="community-resources-heading"
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
          <CultureBoxTabs tabsData={collections.cultureResources} />
        </div>
        <div className="container">
          <div
            className="mb-12 max-w-lg text-left md:mb-18 lg:mb-20"
            data-testid="community-businesses-heading"
          >
            <h1 className="rb-5 mb-5 text-3xl font-bold md:mb-6">
              Influencial businesses and organizations
            </h1>
            <p className="md:text-md">
              Discover the establishments with a history of supporting our
              community.
            </p>
          </div>
          <BusinessBox businessesData={collections.businessResources} />
        </div>
      </div>
      <CTA />
    </section>
  );
}
