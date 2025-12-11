'use client';

import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi';
import Link from 'next/link';

import BenefitCard from '@app/components/Join/BenefitCard';
import MembershipForm from '@app/components/Join/MembershipForm';

export default function Join() {
  return (
    <section className="px-[5%] py-16">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="mx-auto mb-6 max-w-lg md:mb-9 lg:mb-10">
            <div>
              <h2 className="mb-5 text-center text-xl md:text-3xl font-bold md:mb-6">
                Grow your business
              </h2>
              <p className="text-center text-base md:text-lg">
                Join the Meriden/Ozawkie Area Chamber of Commerce and unlock
                powerful opportunities for local business success
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
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
      <div className="container">
        <div className="rb-12 mx-auto mb-12 flex max-w-lg flex-col justify-center text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-lg md:text-3xl font-bold md:mb-6">
            Questions?
          </h2>
          <p className="text-base md:text-lg">
            We are here to answer your membership questions
          </p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-center gap-x-12 gap-y-12 md:grid-cols-3 md:gap-y-16">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiEnvelope className="size-12" />
            </div>
            <h3 className="mb-3 text-lg font-bold leading-[1.4] md:text-xl lg:mb-4">
              Email
            </h3>
            <Link
              href="mailto:meridenozawkieareachamber@gmail.com"
              className="text-sm md:text-base"
            >
              meridenozawkieareachamber@gmail.com
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiPhone className="size-12" />
            </div>
            <h3 className="mb-3 text-lg font-bold leading-[1.4] md:text-xl lg:mb-4">
              Phone
            </h3>
            <p>(785) 817-5979</p>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 lg:mb-6">
              <BiMap className="size-12" />
            </div>
            <h3 className="mb-3 text-lg font-bold leading-[1.4] md:text-xl lg:mb-4">
              Office
            </h3>
            <Link href="https://maps.app.goo.gl/8A8siHDuCAgQYXvP9">
              3675 74th St, Meriden, KS 66512
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
