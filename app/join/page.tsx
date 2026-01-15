'use client';

import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi';
import Link from 'next/link';

import BenefitCard from '@app/components/Join/BenefitCard';
import MembershipForm from '@app/components/Join/MembershipForm';

export default function Join() {
  const contactInfo = [
    {
      icon: BiEnvelope,
      title: 'Email',
      value: 'meridenozawkieareachamber@gmail.com',
      isLink: true,
      href: 'mailto:meridenozawkieareachamber@gmail.com',
    },
    {
      icon: BiPhone,
      title: 'Phone',
      value: '(785) 817-5979',
      isLink: false,
    },
    {
      icon: BiMap,
      title: 'Office',
      value: '3675 74th St, Meriden, KS 66512',
      isLink: true,
      href: 'https://maps.app.goo.gl/8A8siHDuCAgQYXvP9',
    },
  ];

  return (
    <section className="w-full py-16 bg-[#1a56db]">
      <div className="container px-[5%] mx-auto">
        <div className="flex flex-col items-start">
          <div className="mx-auto mb-6 max-w-lg lg:mb-10">
            <div>
              <h2 className="mb-5 text-center text-xl lg:text-3xl font-bold lg:mb-6 text-white">
                Grow your business
              </h2>
              <p className="text-center text-base lg:text-lg text-white">
                Join the Meriden/Ozawkie Area Chamber of Commerce and unlock
                powerful opportunities for local business success
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start mx-auto gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            <BenefitCard
              key="join-benefit-1"
              message="Promote your business through Chamber activities"
              icon="megaphone"
            />
            <BenefitCard
              key="join-benefit-2"
              message="Enhance your network of key business contacts"
              icon="handshake"
            />
            <BenefitCard
              key="join-benefit-3"
              message="Develop our community through meaningful service"
              icon="heart"
            />
            <BenefitCard
              key="join-benefit-4"
              message="Support the creation of strong local businesses"
              icon="cash"
            />
          </div>
        </div>
      </div>
      <MembershipForm />
      <div>
        <div className="rb-12 mx-auto mb-12 flex max-w-lg flex-col justify-center text-center lg:mb-20">
          <h2 className="rb-5 mb-5 text-lg lg:text-3xl font-bold lg:mb-6 text-white">
            Questions?
          </h2>
          <p className="text-base lg:text-lg text-white">
            We are here to answer your membership questions
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-12 gap-y-12 xl:grid-cols-3 xl:gap-y-16">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-start text-center"
              >
                <div className="mb-5 lg:mb-6">
                  <Icon className="size-12 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-bold leading-[1.4] lg:text-xl lg:mb-4 text-white">
                  {contact.title}
                </h3>
                {contact.isLink ? (
                  <Link
                    href={contact.href!}
                    className="text-sm lg:text-base text-white hover:text-gray-200 transition-colors"
                  >
                    {contact.value}
                  </Link>
                ) : (
                  <p className="text-sm lg:text-base text-white">
                    {contact.value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
