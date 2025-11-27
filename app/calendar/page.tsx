import CTA from '@app/components/CTA';
import { wix } from '@app/hooks/Wix';

export default async function Calendar() {
  const { singleItemCollections } = await wix();

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
        <iframe
          src={singleItemCollections.calendar}
          className="border-0"
          width="100%"
          height="600"
        ></iframe>
      </div>
      <CTA />
    </section>
  );
}
