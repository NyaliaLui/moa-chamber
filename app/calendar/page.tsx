import CTA from '@app/components/CTA';

export default function Calendar() {
  const calendarSrc =
    'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&showTitle=0&showCalendars=0&mode=MONTH&src=bnlhbGlhQG55YWxpYXNvZnR3YXJlLnNvbHV0aW9ucw&src=Y184YzhkOTlkMTNlZDk4NjM4Y2RmMTllM2QxMmJhZmM1MzZjOGE0MzAxMzM0Nzk1NWQ2YjRjMDEwMmM0MTVjYjdhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19iNDFiZDdjZjU3YmNjYWQyNjFlOWUyYzUwZDk4NGYxMmMwNmUyODUyODY2N2I3YzVjMWM5NDgyNTE2YWRiMjQzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19iYTNjYTdmYmUxZWUzNzI0YjJjMzRjMzYyNGUwMTcxZmVhNjNkYTNkOGVkMjEzNTJjMDg0YzMxYWM2NmRiY2I0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y19iMzNlZDkxNzE5MmRhZDkyMmQzNDU2NDBiYmYwY2IwNjU2MGIxZjUyZjczYzA4Mzc5YzE4Zjc2YTliMTNiNDJiQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%23000000&color=%23f6bf26&color=%239e69af&color=%230b8043&color=%233f51b5';
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
          src={calendarSrc}
          className="border-0"
          width="100%"
          height="600"
        ></iframe>
      </div>
      <CTA />
    </section>
  );
}
