import Testimonials from '@app/components/Testimonials';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testimonials', () => {
  it('renders the Testimonials component', () => {
    render(<Testimonials />);

    expect(screen.getByText('Member stories')).toBeInTheDocument();
  });

  it('renders main heading as h1', () => {
    render(<Testimonials />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Member stories',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders all three testimonial cards', () => {
    render(<Testimonials />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The chamber helped me connect with key local partners and grow my business.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(
      screen.getByText('Founder, Green Prairie Farms'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Joining the chamber was the best decision for my small business networking.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('Madison Anderson')).toBeInTheDocument();
    expect(screen.getByText('Manager, Anderson Hardware')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The resources and support have been invaluable to our local business community.',
      ),
    ).toBeInTheDocument();
  });

  it('renders all testimonial images', () => {
    render(<Testimonials />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);

    expect(
      screen.getByAltText('Testimonial Jane Consulting img'),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Testimonial Green Prairie Farms img'),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Testimonial Anderson Hardware img'),
    ).toBeInTheDocument();
  });

  it('renders 5-star ratings for all testimonials', () => {
    const { container } = render(<Testimonials />);

    // Each testimonial card should have 5 star icons
    const starIcons = container.querySelectorAll('svg');
    expect(starIcons.length).toBe(15); // 3 testimonials × 5 stars = 15 stars
  });
});
