'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from 'flowbite-react';

import { NAVBAR_ITEMS, PAYPAL_URL } from '@app/constants';
import { Logo } from '@app/components/Logo/Logo';
import testIds from '@app/test-ids';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`w-full py-6 px-2 sm:px-8 z-50 ${isHomePage ? 'absolute top-0 left-0 right-0' : 'bg-[#0e2647]'}`}
      data-testid={testIds.LAYOUT.HEADER}
    >
      <div className="flex items-center justify-between sm:px-14 h-header">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Logo enableLightOutline={true} />
        </Link>

        {/* Desktop Navigation - lg and up */}
        <nav className="hidden lg:flex items-center gap-6 lg:gap-8 flex-1 justify-between ml-8">
          {/* Page Links */}
          <ul className="flex items-center gap-4 lg:gap-6">
            {NAVBAR_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm lg:text-[15px] leading-5.5 transition-colors text-white hover:text-gray-200"
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
              className="text-white border-white hover:text-black! hover:bg-white"
            >
              Pay Fees
            </Button>
            <Button
              color="blue"
              size="sm"
              href="/join"
              as={Link}
              className="text-white!"
            >
              Apply
            </Button>
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden relative z-50 p-3"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="space-y-1.5">
            {(isMenuOpen
              ? [
                  'rotate-45 translate-y-[9px]',
                  'opacity-0 h-0',
                  '-rotate-45 translate-y-[-9px]',
                ]
              : ['', '', '']
            ).map((className, index) => (
              <span
                key={index}
                className={`block h-0.5 w-5 bg-white transform transition duration-500 ease-in-out ${className}`}
              />
            ))}
          </div>
        </button>

        {/* Mobile Menu */}
        <nav
          className={`${
            isMenuOpen
              ? 'max-lg:w-10/12 max-lg:opacity-100'
              : 'max-lg:w-0 max-lg:opacity-0'
          } lg:hidden transition-all duration-500 ease-in-out overflow-scroll fixed animate-sideways-once h-screen bg-[#0e2647] pt-24 z-40 top-0 right-0`}
        >
          <ul className="flex flex-col items-center gap-10">
            {/* Page Links */}
            {NAVBAR_ITEMS.map(({ href, label }) => (
              <li key={href} className="relative">
                <Link
                  href={href}
                  className="text-sm leading-5.5 transition-colors text-white hover:text-gray-200"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
                <span className="absolute -bottom-5 border-b border-white w-48 left-[calc(50%-theme(space.24))]" />
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
                className="text-white border-white hover:text-black! hover:bg-white"
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
                className="text-white!"
              >
                Apply
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
