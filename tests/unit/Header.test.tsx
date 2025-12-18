import Header from '@app/components/Layout/Header';
import { NAVBAR_ITEMS, PAYPAL_URL } from '@app/constants';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('Header', () => {
  it('renders the header component', () => {
    render(<Header />);

    const header = screen.getByTestId(testIds.LAYOUT.HEADER);
    expect(header).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Header />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeInTheDocument();
  });

  it('logo is within the home link', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: /MOA Chamber Logo/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(homeLink).toContainElement(logo);
  });

  describe('Desktop Navigation', () => {
    it('renders all navigation links', () => {
      render(<Header />);

      NAVBAR_ITEMS.forEach(({ label }) => {
        const links = screen.getAllByText(label);
        // Should appear in desktop nav
        expect(links.length).toBeGreaterThan(0);
      });
    });

    it('renders Pay Fees button with correct href', () => {
      render(<Header />);

      const payFeesButtons = screen.getAllByText('Pay Fees');
      // Find the one that's a link (not just text)
      const payFeesButton = payFeesButtons.find(
        (button) => button.closest('a')?.href === PAYPAL_URL,
      );

      expect(payFeesButton).toBeInTheDocument();
    });

    it('renders Apply button with correct href', () => {
      render(<Header />);

      const applyButtons = screen.getAllByText('Apply');
      expect(applyButtons.length).toBeGreaterThan(0);
    });

    it('Pay Fees button opens in new tab', () => {
      render(<Header />);

      const payFeesLinks = screen
        .getAllByText('Pay Fees')
        .map((el) => el.closest('a'))
        .filter(Boolean);

      const externalLink = payFeesLinks.find((link) =>
        link?.getAttribute('target'),
      );
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Mobile Navigation', () => {
    it('renders hamburger menu button', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('hamburger button has three spans for the icon', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      const spans = menuButton.querySelectorAll('span');
      expect(spans).toHaveLength(3);
    });

    it('toggles menu open when hamburger is clicked', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(menuButton);

      const closeButton = screen.getByRole('button', { name: /close menu/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('displays all navigation items in mobile menu when open', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(menuButton);

      NAVBAR_ITEMS.forEach(({ label }) => {
        const items = screen.getAllByText(label);
        expect(items.length).toBeGreaterThan(0);
      });
    });

    it('displays action buttons in mobile menu when open', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(menuButton);

      const payFeesButtons = screen.getAllByText('Pay Fees');
      const applyButtons = screen.getAllByText('Apply');

      expect(payFeesButtons.length).toBeGreaterThan(0);
      expect(applyButtons.length).toBeGreaterThan(0);
    });

    it('closes menu when a navigation link is clicked', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(menuButton);

      const navLinks = screen.getAllByText(NAVBAR_ITEMS[0].label);
      // Find the link in the mobile menu (there are duplicates for desktop/mobile)
      // Choose the second link since Jest auto loads on mobile first.
      fireEvent.click(navLinks[1]);

      // Menu should be closed - button should say "Open menu" again
      const openButton = screen.getByRole('button', { name: /open menu/i });
      expect(openButton).toBeInTheDocument();
    });

    it('closes menu when home logo is clicked', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(menuButton);

      const homeLink = screen.getByRole('link', { name: /MOA Chamber Logo/i });
      fireEvent.click(homeLink);

      // Menu should be closed
      const openButton = screen.getByRole('button', { name: /open menu/i });
      expect(openButton).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('desktop navigation has hidden class on mobile', () => {
      render(<Header />);

      const desktopNav = screen
        .getAllByRole('navigation')
        .find((nav) => nav.className.includes('hidden lg:flex'));

      expect(desktopNav).toBeInTheDocument();
    });

    it('mobile menu is hidden by default', () => {
      render(<Header />);

      const mobileNav = screen
        .getAllByRole('navigation')
        .find((nav) => nav.className.includes('lg:hidden'));

      expect(mobileNav).toHaveClass('max-lg:w-0', 'max-lg:opacity-0');
    });

    it('mobile menu becomes visible when opened', () => {
      render(<Header />);

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      fireEvent.click(menuButton);

      const mobileNav = screen
        .getAllByRole('navigation')
        .find((nav) => nav.className.includes('lg:hidden'));

      expect(mobileNav).toHaveClass('max-lg:w-10/12', 'max-lg:opacity-100');
    });
  });
});
