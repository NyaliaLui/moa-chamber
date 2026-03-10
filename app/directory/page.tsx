import CTA from '@app/components/CTA';
import { fetchMemberCards } from '@app/hooks/WixServer';
import testIds from '@app/test-ids';
import DirectoryList from '@app/components/Directory/DirectoryList';

export default async function Directory() {
  const memberCards = await fetchMemberCards();

  return (
    <>
      <section className="w-full py-16 bg-[#1a56db]">
        <div className="container px-[5%] mx-auto">
          <div className="mb-6 lg:mb-10">
            <div className="mx-auto max-w-lg text-center">
              <h1
                className="mt-3 text-3xl font-bold lg:mt-4 text-white"
                data-testid={testIds.PROJECTS_PAGE.HEADER}
              >
                Our Members
              </h1>
              <p className="mt-5 text-lg lg:mt-6 text-white">
                Discover local businesses that drive our community&apos;s
                economic strength and collaboration.
              </p>
            </div>
          </div>
          <DirectoryList memberCards={memberCards} />
        </div>
      </section>
      <CTA />
    </>
  );
}
