import Link from 'next/link';
import { BiLogoFacebookCircle } from 'react-icons/bi';

import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/utils/test-ids';
import navbarItems from '@app/utils/navbar-items';

const groups = 3;

const Footer = () => (
  <footer
    className="px-[5%] py-12 md:py-18 lg:py-20"
    data-testid={testIds.LAYOUT.FOOTER}
  >
    <div className="container">
      <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 border border-border-primary p-8 md:gap-y-16 md:p-12 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4">
        <div>
          <div className="mb-6 md:mb-8">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="mb-6 md:mb-8">
            <p className="mb-1 text-xs sm:text-sm font-semibold">Address:</p>
            <p className="mb-5 text-xs sm:text-sm md:mb-6">
              3675 74th St, Meriden, KS 66512
            </p>
            <p className="mb-1 text-xs sm:text-sm font-semibold">Contact:</p>
            <Link
              href="tel:1800 123 4567"
              className="block text-xs sm:text-sm underline decoration-black underline-offset-1"
            >
              (785) 817-8877
            </Link>
            <Link
              href="mailto:meridenozawkieareachamber@gmail.com"
              className="block text-xs sm:text-sm underline decoration-black underline-offset-1"
            >
              meridenozawkieareachamber@gmail.com
            </Link>
          </div>
          <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3">
            <Link href="https://www.facebook.com/MeridenOzawkieChamber">
              <BiLogoFacebookCircle className="size-6" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-4">
          <ul>
            {navbarItems.slice(0, groups).map(({ ref, label }) => (
              <li key={ref} className="py-2 text-xs sm:text-sm font-semibold">
                <Link href={ref}>{label}</Link>
              </li>
            ))}
          </ul>
          <ul>
            {navbarItems.slice(groups, groups * 2).map(({ ref, label }) => (
              <li key={ref} className="py-2 text-xs sm:text-sm font-semibold">
                <Link href={ref}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-xs sm:text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
        <p className="mt-8 md:mt-0">
          © 2025 Meriden-Ozawkie Area Chamber of Commerce. All rights reserved.
        </p>
        <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-xs sm:text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
          <li className="underline">
            <a href="https://www.nyaliasoftware.solutions/">
              Built by Nyalia&apos;s Software Solutions
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
