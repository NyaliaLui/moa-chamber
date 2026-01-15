'use client';

import { BiEnvelope, BiMap, BiMessageDetail, BiPhone } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import testIds from '@app/test-ids';
import { useWixMembers } from '@app/hooks/Wix';
import { DEFAULTS } from '@app/constants';
import LoadingState from '@app/components/LoadingState';

export default function Member({ params }: any) {
  const { data: members, isLoading, error } = useWixMembers();
  const { slug } = use(params) as { slug: string };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    throw error;
  }

  if (!members) {
    throw new Error('members are undefined');
  }

  let member = members.filter((item) => item.slug === slug).pop();
  if (!member) {
    member = DEFAULTS.project;
  }

  const contactInfo = [
    {
      icon: BiEnvelope,
      title: 'Email',
      value: member.email,
      isLink: false,
    },
    {
      icon: BiMessageDetail,
      title: 'Website',
      value: member.website,
      isLink: true,
    },
    {
      icon: BiPhone,
      title: 'Phone',
      value: member.phoneNumber,
      isLink: false,
    },
    {
      icon: BiMap,
      title: 'Address',
      value: member.address,
      isLink: false,
    },
  ];

  return (
    <section
      className="w-full py-16 bg-[#1a56db]"
      data-testid={testIds.PROJECT_DETAILS_PAGE.CONTAINER}
    >
      <div className="container px-[5%] mx-auto">
        <div className="mb-12 lg:mb-20 overflow-hidden rounded-lg">
          <Image
            src={member.cover.url}
            alt={member.title}
            width={member.cover.width}
            height={member.cover.height}
            className="w-full h-auto aspect-video object-cover"
          />
        </div>
        <div className="mx-auto max-w-lg">
          <h1 className="mb-5 text-3xl font-bold lg:mb-6 lg:text-6xl text-white text-center">
            {member.title}
          </h1>
          <div className="prose prose-invert">
            <p className="text-white text-left text-base">
              {member.longDescription}
            </p>
          </div>
        </div>
        <div className="py-16 lg:py-28 grid auto-cols-fr gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-y-16">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-start text-center"
              >
                <div className="mb-5 sm:mb-6">
                  <Icon className="size-12 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold leading-[1.4] lg:text-4xl lg:mb-4 text-white">
                  {contact.title}
                </h3>
                {contact.isLink ? (
                  <Link
                    className="underline text-white hover:text-gray-200"
                    href={contact.value}
                  >
                    {contact.value}
                  </Link>
                ) : (
                  <span className="text-white">{contact.value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
