'use client';

import { useState } from 'react';
import { Button } from 'flowbite-react';

import testIds from '@app/test-ids';
import CTA from '@app/components/CTA';
import MemberCard from '@app/components/Directory/MemberCard';
import { useWixMemberCards } from '@app/hooks/Wix';
import LoadingState from '@app/components/LoadingState';

const MEMBERS_PER_PAGE = 6;

export default function Directory() {
  const { data: memberCards, isLoading, error } = useWixMemberCards();
  const [displayCount, setDisplayCount] = useState(MEMBERS_PER_PAGE);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    throw error;
  }

  if (!memberCards) {
    throw new Error('member cards are undefined');
  }

  const displayedMembers = memberCards.slice(0, displayCount);
  const hasMore = displayCount < memberCards.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + MEMBERS_PER_PAGE);
  };

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
          <div
            className="grid grid-cols-1 gap-x-5 gap-y-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16"
            data-testid={testIds.PROJECTS_PAGE.PROJECT_LIST}
          >
            {displayedMembers.map((item, index) => (
              <MemberCard
                key={index}
                media={item.media}
                name={item.name}
                address={item.address}
                slug={item.slug}
              />
            ))}
          </div>
          {hasMore && (
            <div className="mt-16 flex justify-center">
              <Button
                color="dark"
                size="lg"
                outline
                onClick={handleLoadMore}
                className="text-white! hover:text-black! border-white! hover:border-white! hover:bg-white shadow-none!"
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}
