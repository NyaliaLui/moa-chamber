'use client';

import CTA from '@app/components/CTA';
import { useWixCalendar } from '@app/hooks/Wix';
import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

export default function Calendar() {
  const { data: calendar, isLoading, error } = useWixCalendar();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!calendar) {
    return <ErrorState error={new Error('calendar is undefined')} />;
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
