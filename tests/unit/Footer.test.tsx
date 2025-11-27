import Footer from '@app/components/Layout/Footer';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renders the footer component', () => {
    render(<Footer />);

    const footer = screen.getByTestId(testIds.LAYOUT.FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Footer />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders address information', () => {
    render(<Footer />);

    expect(screen.getByText('Address:')).toBeInTheDocument();
    expect(
      screen.getByText('3675 74th St, Meriden, KS 66512'),
    ).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);

    expect(screen.getByText('Contact:')).toBeInTheDocument();
  });

  it('renders phone number link', () => {
    render(<Footer />);

    const phoneLink = screen.getByText('(785) 817-8877');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:1800 123 4567');
  });

  it('renders email link', () => {
    render(<Footer />);

    const emailLink = screen.getByText('meridenozawkieareachamber@gmail.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:meridenozawkieareachamber@gmail.com',
    );
  });

  it('renders Facebook social link', () => {
    render(<Footer />);

    const facebookLink = screen
      .getAllByRole('link')
      .find((link) =>
        link
          .getAttribute('href')
          ?.includes('facebook.com/MeridenOzawkieChamber'),
      );

    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/MeridenOzawkieChamber',
    );
  });

  it('renders navigation links in footer', () => {
    render(<Footer />);

    expect(screen.getByText('Our Members')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Community Resources')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        '© 2025 Meriden-Ozawkie Area Chamber of Commerce. All rights reserved.',
      ),
    ).toBeInTheDocument();
  });

  it('renders developer credit link', () => {
    render(<Footer />);

    const developerLink = screen.getByText(
      "Built by Nyalia's Software Solutions",
    );
    expect(developerLink).toBeInTheDocument();
    expect(developerLink.closest('a')).toHaveAttribute(
      'href',
      'https://www.nyaliasoftware.solutions/',
    );
  });

  it('logo is within a link to home', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    const logoLink = links.find((link) =>
      link.querySelector('img[alt="MOA Chamber Logo"]'),
    );

    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('navigation links have correct hrefs', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');

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

    const aboutLink = links.find((link) =>
      link.textContent?.includes('About Us'),
    );
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
