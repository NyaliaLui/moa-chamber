import CTA from '@app/components/CTA';
import testIds from '@app/test-ids';
import { fetchTeam, fetchBoardMembers } from '@app/hooks/WixServer';
import { HRTrimmed } from 'flowbite-react';
import Mission from '@app/components/About/Mission';
import Staff from '@app/components/About/Staff';
import BoardOfDirectors from '@app/components/About/BoardOfDirectors';

export default async function About() {
  const [team, boardMembers] = await Promise.all([
    fetchTeam(),
    fetchBoardMembers(),
  ]);

  return (
    <>
      <section
        className="w-full py-16 bg-[#1a56db]"
        data-testid={testIds.TEAM_PAGE.CONTAINER}
      >
        <div className="container px-[5%] mx-auto">
          <Mission />
          <HRTrimmed className="my-8 h-px bg-white" />
          <Staff team={team} />
          <BoardOfDirectors boardMembers={boardMembers} />
        </div>
      </section>
      <CTA />
    </>
  );
}
