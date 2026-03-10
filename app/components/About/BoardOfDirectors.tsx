'use client';

import BoardMemberCard from '@app/components/About/BoardMemberCard';
import type { BoardMemberCardProps } from '@app/components/About/BoardMemberCard';

export default function BoardOfDirectors({
  boardMembers,
}: {
  boardMembers: BoardMemberCardProps[];
}) {
  return (
    <div>
      <div className="mb-6 lg:mb-10">
        <h2 className="mb-5 text-3xl font-bold lg:mb-6 text-white">
          Board of Directors
        </h2>
        <p className="text-base lg:text-lg text-white">
          Community leaders who understand the pulse of our local economy
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-y-16">
        {boardMembers.map((item, index) => (
          <BoardMemberCard
            key={index}
            name={item.name}
            role={item.role}
            employer={item.employer}
          />
        ))}
      </div>
      <div className="mt-14 w-full max-w-md lg:mt-24" />
    </div>
  );
}
