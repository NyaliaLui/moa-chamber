'use client';

import { BiEnvelope, BiMap, BiMessageDetail, BiPhone } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import testIds from '@app/test-ids';
import { useWixMembers } from '@app/hooks/Wix';
import { DEFAULTS } from '@app/constants';
import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

export default function Member({ params }: any) {
  const { data: members, isLoading, error } = useWixMembers();
  const { slug } = use(params) as { slug: string };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!members) {
    return <ErrorState error={new Error('members are undefined')} />;
  }

  let member = members.filter((item) => item.slug === slug).pop();
  if (!member) {
    member = DEFAULTS.project;
  }

  return (
    <section
      className="px-[5%] mt-16"
      data-testid={testIds.PROJECT_DETAILS_PAGE.CONTAINER}
    >
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <Image
            src={member.cover.url}
            alt={member.title}
            width={member.cover.width}
            height={member.cover.height}
            className="w-full h-auto aspect-video object-contain"
          />
        </div>
        <div className="mx-auto max-w-lg">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-6xl">
            {member.title}
          </h1>
          <div className="prose">
            <p>{member.longDescription}</p>
          </div>
        </div>
        <div className="py-16 md:py-24 lg:py-28 grid auto-cols-fr gap-x-8 gap-y-12 sm:gap-x-8 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiEnvelope className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Email
            </h3>
            {member.email}
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiMessageDetail className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Website
            </h3>
            <Link className="underline" href={member.website}>
              {member.website}
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiPhone className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Phone
            </h3>
            {member.phoneNumber}
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiMap className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Address
            </h3>
            {member.address}
          </div>
        </div>
      </div>
    </section>
  );
}
