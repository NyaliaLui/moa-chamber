import CTA from '@app/components/CTA';
import { getCollectionImage } from '@app/components/Image/WixMediaImage';
import { DEFAULTS } from '@app/constants';
import { getWixClient } from '@app/hooks/useWixClientServer';

export default async function Calendar() {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items.query('TestCalendar').find();
  const ctaImage = await getCollectionImage(
    wixClient,
    'TestCTA',
    DEFAULTS.home.cta,
  );

  return (
    <section className="px-[5%] mt-16">
      <div className="container mx-auto max-w-lg text-center">
        <h1 className="mb-5 text-2xl font-bold md:mb-6">Chamber Calendar</h1>
        <p className="text-lg">
          Discover opportunities that drive business growth and community
          engagement.
        </p>
      </div>
      <div className="container pt-8">
        {items?.map((item) => (
          <iframe
            key={item._id}
            src={item.calendarSrc}
            className="border-0"
            width="100%"
            height="600"
          ></iframe>
        ))}
      </div>
      <CTA image={ctaImage} />
    </section>
  );
}
