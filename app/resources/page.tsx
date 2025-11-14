import CultureBoxTabs, {
  type TabContent,
} from '@app/components/Resources/CultureBoxTabs';
import BusinessBox, {
  type Business,
} from '@app/components/Resources/BusinessBox';
import CTA from '@app/components/CTA';
import { DEFAULTS } from '@app/constants';
import { getWixClient } from '@app/hooks/useWixClientServer';
import { getImageUrlForMedia } from '@app/components/Image/WixMediaImage';

export default async function Resources() {
  const wixClient = await getWixClient();
  const { items: cultureResourcesRaw } = await wixClient.items
    .query('CultureResources')
    .find();
  const { items: businessResourcesRaw } = await wixClient.items
    .query('BusinessResources')
    .find();

  // Convert Wix data to TabContent type
  const tabsData: TabContent[] = cultureResourcesRaw.map((item) => ({
    id: item._id,
    name: item?.name || DEFAULTS.resources.culture.name,
    heading: item?.heading || DEFAULTS.resources.culture.heading,
    description: item?.description || DEFAULTS.resources.culture.description,
    ctaLink: item?.ctaLink || DEFAULTS.resources.culture.ctaLink,
    ctaLabel: item?.ctaLabel || DEFAULTS.resources.culture.ctaLabel,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.resources.culture.image,
  }));

  // Convert Wix data to Business type
  const businessesData: Business[] = businessResourcesRaw.map((item) => ({
    name: item?.name || DEFAULTS.resources.business.name,
    description: item?.description || DEFAULTS.resources.business.description,
    website: item?.website || DEFAULTS.resources.business.website,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.resources.business.image,
  }));

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
          <CultureBoxTabs tabsData={tabsData} />
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
          <BusinessBox businessesData={businessesData} />
        </div>
      </div>
      <CTA />
    </section>
  );
}
