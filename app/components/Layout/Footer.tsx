'use client';

import Link from 'next/link';
import { BiLogoFacebookCircle } from 'react-icons/bi';

import { Logo } from '@app/components/Logo/Logo';
import { NAVBAR_ITEMS } from '@app/constants';
import testIds from '@app/test-ids';

function Footer() {
  const groups = 3;
  return (
    <footer
      className="w-full py-12 lg:py-18 xl:py-20 bg-[#0e2647]"
      data-testid={testIds.LAYOUT.FOOTER}
    >
      <div className="container px-[5%] mx-auto">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 border border-white/60 rounded-lg p-8 lg:gap-y-16 lg:p-12 xl:grid-cols-[1fr_0.5fr] xl:gap-y-4">
          <div>
            <div className="mb-6 lg:mb-8">
              <Link href="/">
                <Logo enableLightOutline={true} />
              </Link>
            </div>
            <div className="mb-6 lg:mb-8">
              <p className="mb-1 text-xs sm:text-sm font-semibold text-white">
                Address:
              </p>
              <p className="mb-5 text-xs sm:text-sm lg:mb-6 text-white">
                3675 74th St, Meriden, KS 66512
              </p>
              <p className="mb-1 text-xs sm:text-sm font-semibold text-white">
                Contact:
              </p>
              <Link
                href="tel:1800 123 4567"
                className="block text-xs sm:text-sm underline decoration-white underline-offset-1 text-white"
              >
                (785) 817-8877
              </Link>
              <Link
                href="mailto:meridenozawkieareachamber@gmail.com"
                className="block text-xs sm:text-sm underline decoration-white underline-offset-1 text-white"
              >
                meridenozawkieareachamber@gmail.com
              </Link>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
              <Link href="https://www.facebook.com/MeridenOzawkieChamber">
                <BiLogoFacebookCircle className="size-6 text-white" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-4">
            <ul>
              {NAVBAR_ITEMS.slice(0, groups).map(({ href, label }) => (
                <li
                  key={href}
                  className="py-2 text-xs sm:text-sm font-semibold text-white"
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
            <ul>
              {NAVBAR_ITEMS.slice(groups, groups * 2).map(({ href, label }) => (
                <li
                  key={href}
                  className="py-2 text-xs sm:text-sm font-semibold text-white"
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-xs sm:text-sm lg:flex-row lg:items-center lg:pb-0 lg:pt-8">
          <p className="mt-8 lg:mt-0 text-white">
            © 2025 Meriden-Ozawkie Area Chamber of Commerce. All rights
            reserved.
          </p>
          <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-xs sm:text-sm lg:grid-flow-col lg:gap-x-6 lg:gap-y-0">
            <li className="underline text-white">
              <a href="https://www.nyaliasoftware.solutions/">
                Built by Nyalia&apos;s Software Solutions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
