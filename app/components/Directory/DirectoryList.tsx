'use client';

import { useState } from 'react';
import { Button } from 'flowbite-react';
import testIds from '@app/test-ids';
import MemberCard from '@app/components/Directory/MemberCard';
import type { MemberCardProps } from '@app/components/Directory/MemberCard';

const MEMBERS_PER_PAGE = 6;

export default function DirectoryList({
  memberCards,
}: {
  memberCards: MemberCardProps[];
}) {
  const [displayCount, setDisplayCount] = useState(MEMBERS_PER_PAGE);

  const displayedMembers = memberCards.slice(0, displayCount);
  const hasMore = displayCount < memberCards.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + MEMBERS_PER_PAGE);
  };

  return (
    <>
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
    </>
  );
}
