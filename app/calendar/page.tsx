'use client';

import CTA from '@app/components/CTA';
import { useWixCalendar } from '@app/hooks/Wix';

export default function Calendar() {
  const { data: calendar, isLoading, error } = useWixCalendar();

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

  if (!calendar) {
    return (
      <section className="px-[5%] mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg text-red-600">Error: calendar is undefined</p>
        </div>
      </section>
    );
  }

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
          src={calendar}
          className="border-0"
          width="100%"
          height="600"
        ></iframe>
      </div>
      <CTA />
    </section>
  );
}
