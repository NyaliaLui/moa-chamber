import CTA from '@app/components/CTA';
import { fetchCalendar } from '@app/hooks/WixServer';
import ChamberCalendar from '@app/components/Calendar/ChamberCalendar';

export default async function Calendar() {
  const calendar = await fetchCalendar();

  return (
    <>
      <ChamberCalendar calendar={calendar} />
      <CTA />
    </>
  );
}
