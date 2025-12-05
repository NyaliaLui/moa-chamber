'use client';

import testIds from '@app/test-ids';
import CTA from '@app/components/CTA';
import MemberCard from '@app/components/Directory/MemberCard';
import { useWixMemberCards } from '@app/hooks/Wix';
import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

export default function Directory() {
  const { data: memberCards, isLoading, error } = useWixMemberCards();

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

  return (
    <section className="px-[5%]">
      <div className="container">
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
          {memberCards.map((item, index) => (
            <MemberCard
              key={index}
              media={item.media}
              name={item.name}
              address={item.address}
              slug={item.slug}
            />
          ))}
        </div>
        <div className="mt-14 flex justify-center md:mt-20 lg:mt-24" />
      </div>
      <CTA />
    </section>
  );
}
