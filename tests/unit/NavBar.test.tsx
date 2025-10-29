import { NavBar } from '@app/components/Layout/NavBar/NavBar';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('NavBar', () => {
  it('renders the navbar component', () => {
    render(<NavBar />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<NavBar />);

    expect(screen.getByText('Our Members')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Community Resources')).toBeInTheDocument();
  });

  it('renders Apply button', () => {
    render(<NavBar />);

    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('renders Pay Fees button', () => {
    render(<NavBar />);

    expect(screen.getByText('Pay Fees')).toBeInTheDocument();
  });

  it('renders hamburger menu button on mobile', () => {
    render(<NavBar />);

    const hamburgerButton = screen.getByRole('button');
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('toggles menu when hamburger button is clicked', () => {
    render(<NavBar />);

    const hamburgerButton = screen.getByRole('button');
    const nav = screen.getByRole('navigation');

    // Initially, menu should be hidden on mobile
    expect(nav).toHaveClass('max-md:w-0', 'max-md:opacity-0');

    // Click to open menu
    fireEvent.click(hamburgerButton);

    // Menu should be visible
    expect(nav).toHaveClass('max-md:w-full', 'max-md:opacity-100');

    // Click again to close
    fireEvent.click(hamburgerButton);

    // Menu should be hidden again
    expect(nav).toHaveClass('max-md:w-0', 'max-md:opacity-0');
  });

  it('hamburger icon transforms when menu is open', () => {
    render(<NavBar />);

    const hamburgerButton = screen.getByRole('button');

    // Click to open menu
    fireEvent.click(hamburgerButton);

    const lines = hamburgerButton.querySelectorAll('span');

    // First line should rotate
    expect(lines[0]).toHaveClass('rotate-45');

    // Second line should be hidden
    expect(lines[1]).toHaveClass('opacity-0', 'h-0');

    // Third line should rotate
    expect(lines[2]).toHaveClass('-rotate-45');
  });

  it('all navigation links have correct hrefs', () => {
    render(<NavBar />);

    const links = screen.getAllByRole('link');

    // Find specific links and verify their hrefs
    const ourMembersLink = links.find((link) =>
      link.textContent?.includes('Our Members'),
    );
    expect(ourMembersLink).toHaveAttribute('href', '/directory');

    const calendarLink = links.find((link) =>
      link.textContent?.includes('Calendar'),
    );
    expect(calendarLink).toHaveAttribute('href', '/calendar');

    const newsLink = links.find((link) => link.textContent?.includes('News'));
    expect(newsLink).toHaveAttribute('href', '/news');
  });

  it('closes menu when a nav link is clicked', () => {
    render(<NavBar />);

    const hamburgerButton = screen.getByRole('button');
    const nav = screen.getByRole('navigation');

    // Open menu
    fireEvent.click(hamburgerButton);
    expect(nav).toHaveClass('max-md:w-full', 'max-md:opacity-100');

    // Click a nav link
    const newsLink = screen.getByText('News');
    fireEvent.click(newsLink);

    // Menu should close
    expect(nav).toHaveClass('max-md:w-0', 'max-md:opacity-0');
  });
});
