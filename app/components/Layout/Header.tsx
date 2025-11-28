'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Button } from 'flowbite-react';

import { NAVBAR_ITEMS, PAYPAL_URL } from '@app/constants';
import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/test-ids';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className="w-full my-6 px-2 sm:px-8"
      data-testid={testIds.LAYOUT.HEADER}
    >
      <div className="flex items-center justify-between sm:px-14 h-header">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 z-50"
          onClick={closeMenu}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation - md and up */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-between ml-8">
          {/* Page Links */}
          <ul className="flex items-center gap-4 lg:gap-6">
            {NAVBAR_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm lg:text-[15px] leading-[22px] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Button
              color="dark"
              size="sm"
              href={PAYPAL_URL}
              outline
              as="a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pay Fees
            </Button>
            <Button color="blue" size="sm" href="/join" as={Link}>
              Apply
            </Button>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden relative z-50 p-3"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="space-y-2">
            {(isMenuOpen
              ? [
                  'rotate-45 translate-y-[13px]',
                  'opacity-0 h-0',
                  '-rotate-45 translate-y-[-13px]',
                ]
              : ['', '', '']
            ).map((className, index) => (
              <span
                key={index}
                className={`block h-[3px] w-6 bg-black transform transition duration-500 ease-in-out ${className}`}
              />
            ))}
          </div>
        </button>

        {/* Mobile Menu */}
        <nav
          className={`${
            isMenuOpen
              ? 'max-md:w-full max-md:opacity-100'
              : 'max-md:w-0 max-md:opacity-0'
          } md:hidden transition-all duration-500 ease-in-out overflow-hidden absolute animate-sideways-once h-screen bg-white pt-24 z-40 top-0 right-0`}
        >
          <ul className="flex flex-col items-center gap-10">
            {/* Page Links */}
            {NAVBAR_ITEMS.map(({ href, label }) => (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className="text-sm leading-[22px] transition-colors"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
                <span className="absolute -bottom-5 border-b-2 w-48 left-[calc(50%-theme(space.24))]" />
              </li>
            ))}

            {/* Buttons */}
            <li className="mt-4">
              <Button
                color="dark"
                size="sm"
                href={PAYPAL_URL}
                outline
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Pay Fees
              </Button>
            </li>
            <li>
              <Button
                color="blue"
                size="sm"
                href="/join"
                as={Link}
                onClick={closeMenu}
              >
                Apply
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
