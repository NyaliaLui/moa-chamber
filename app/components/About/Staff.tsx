'use client';

import StaffCard from '@app/components/About/StaffCard';
import type { StaffCardProps } from '@app/components/About/StaffCard';

export default function Staff({ team }: { team: StaffCardProps[] }) {
  return (
    <div className="mt-16">
      <div className="mx-auto mb-12 text-center lg:mb-20">
        <h1 className="rb-5 mb-5 text-3xl font-bold lg:mb-6 text-white">
          Staff
        </h1>
        <p className="text-base lg:text-lg text-white">
          Dedicated professionals driving business growth in our community
        </p>
      </div>
      <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
        {team.map((item, index) => (
          <StaffCard
            key={index}
            name={item.name}
            image={item.image}
            role={item.role}
            email={item.email}
            bio={item.bio}
            linkedIn={item.linkedIn}
            twitter={item.twitter}
          />
        ))}
      </div>
      <div className="mx-auto mt-14 w-full max-w-md text-center lg:mt-24" />
    </div>
  );
}
