'use client';

import testIds from '@app/test-ids';

export default function ChamberCalendar({ calendar }: { calendar: string }) {
  return (
    <section
      className="px-[5%] py-16 bg-[#1a56db]"
      data-testid={testIds.CALENDAR.CONTAINER}
    >
      <div className="container mx-auto max-w-lg text-center">
        <h1 className="mb-5 text-2xl font-bold lg:mb-6 text-white">
          Chamber Calendar
        </h1>
        <p className="text-lg text-white">
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
    </section>
  );
}
