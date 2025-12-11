'use client';

import { useState } from 'react';
import testIds from '@app/test-ids';
import CTA from '@app/components/CTA';
import MemberCard from '@app/components/Directory/MemberCard';
import { useWixMemberCards } from '@app/hooks/Wix';
import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

const MEMBERS_PER_PAGE = 6;

export default function Directory() {
  const { data: memberCards, isLoading, error } = useWixMemberCards();
  const [displayCount, setDisplayCount] = useState(MEMBERS_PER_PAGE);

  if (isLoading) {
    return <LoadingState className="px-[5%]" />;
  }

  if (error) {
    return <ErrorState error={error} className="px-[5%]" />;
  }

  if (!memberCards) {
    return (
      <ErrorState
        error={new Error('member cards are undefined')}
        className="px-[5%]"
      />
    );
  }

  const displayedMembers = memberCards.slice(0, displayCount);
  const hasMore = displayCount < memberCards.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + MEMBERS_PER_PAGE);
  };

  return (
    <>
      <section className="container px-[5%]">
        <div className="mb-6 md:mb-9 lg:mb-10">
          <div className="mx-auto max-w-lg text-center">
            <h1
              className="mt-3 text-3xl font-bold md:mt-4"
              data-testid={testIds.PROJECTS_PAGE.HEADER}
            >
              Our Members
            </h1>
            <p className="mt-5 text-lg md:mt-6">
              Discover local businesses that drive our community&apos;s economic
              strength and collaboration.
            </p>
          </div>
        </div>
        <div
          className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12"
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
          <div className="mt-14 flex justify-center md:mt-20 lg:mt-24">
            <button
              onClick={handleLoadMore}
              className="rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </section>
      <CTA />
    </>
  );
}
