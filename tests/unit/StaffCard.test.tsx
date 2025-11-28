import StaffCard from '@app/components/About/StaffCard';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEFAULT_WIX_IMAGE } from '@app/constants';

describe('StaffCard', () => {
  const mockProps = {
    name: 'John Doe',
    image: DEFAULT_WIX_IMAGE,
    role: 'Executive Director',
    email: 'john.doe@example.com',
    bio: 'A passionate leader with 10 years of experience.',
    linkedIn: 'johndoe',
    twitter: 'johndoe',
  };

  it('renders the component with all props', () => {
    render(<StaffCard {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.role)).toBeInTheDocument();
    expect(screen.getByText(mockProps.email)).toBeInTheDocument();
    expect(screen.getByText(mockProps.bio)).toBeInTheDocument();
  });

  it('renders name as h5 heading', () => {
    render(<StaffCard {...mockProps} />);

    const heading = screen.getByRole('heading', {
      level: 5,
      name: mockProps.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders role as h6 heading', () => {
    render(<StaffCard {...mockProps} />);

    const roleHeading = screen.getByRole('heading', {
      level: 6,
      name: mockProps.role,
    });
    expect(roleHeading).toBeInTheDocument();
  });

  it('renders email as h6 heading', () => {
    render(<StaffCard {...mockProps} />);

    const emailHeading = screen.getByRole('heading', {
      level: 6,
      name: mockProps.email,
    });
    expect(emailHeading).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<StaffCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.role);
    expect(image).toBeInTheDocument();
  });

  it('renders bio text in paragraph', () => {
    render(<StaffCard {...mockProps} />);

    const bio = screen.getByText(mockProps.bio);
    expect(bio).toBeInTheDocument();
    expect(bio.tagName).toBe('P');
  });

  it('renders LinkedIn link with correct href', () => {
    render(<StaffCard {...mockProps} />);

    const links = screen.getAllByRole('link');
    const linkedInLink = links.find((link) =>
      link.getAttribute('href')?.includes('linkedin.com'),
    );

    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute(
      'href',
      `https://www.linkedin.com/in/${mockProps.linkedIn}/`,
    );
  });

  it('renders Twitter link with correct href', () => {
    render(<StaffCard {...mockProps} />);

    const links = screen.getAllByRole('link');
    const twitterLink = links.find((link) =>
      link.getAttribute('href')?.includes('x.com'),
    );

    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute(
      'href',
      `https://x.com/${mockProps.twitter}`,
    );
  });

  it('renders both social media links', () => {
    render(<StaffCard {...mockProps} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('renders image with correct src from WixImage', () => {
    render(<StaffCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.role);
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('placeholder.jpg'),
    );
  });

  it('renders image with correct dimensions from WixImage', () => {
    render(<StaffCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.role);
    expect(image).toHaveAttribute('width', String(mockProps.image.width));
    expect(image).toHaveAttribute('height', String(mockProps.image.height));
  });
});
