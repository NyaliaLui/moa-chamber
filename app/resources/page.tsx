import CTA from '@app/components/CTA';
import CommunityTreasures from '@app/components/Resources/CommunityTreasures';
import InfluentialBusinesses from '@app/components/Resources/InfluentialBusinesses';
import {
  fetchCultureResources,
  fetchBusinessResources,
} from '@app/hooks/WixServer';
import testIds from '@app/test-ids';

export default async function Resources() {
  const [cultureResources, businessResources] = await Promise.all([
    fetchCultureResources(),
    fetchBusinessResources(),
  ]);

  return (
    <>
      <section
        className="container px-[5%] py-16 bg-[#1a56db] text-white"
        data-testid={testIds.RESOURCES.CONTAINER}
      >
        <CommunityTreasures cultureResources={cultureResources} />
        <InfluentialBusinesses businessResources={businessResources} />
      </section>
      <CTA />
    </>
  );
}
