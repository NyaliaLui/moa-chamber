import MemberCard from '@app/components/Directory/MemberCard';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MemberCard', () => {
  const mockProps = {
    media: 'wix:image://v1/member-logo.jpg',
    name: 'ABC Corporation',
    address: '123 Main Street, City, State 12345',
    slug: 'abc-corporation',
  };

  it('renders the component with all props', () => {
    render(<MemberCard {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.address)).toBeInTheDocument();
    expect(screen.getByText('Find out more')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<MemberCard {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/directory/${mockProps.slug}`);
  });

  it('renders image with correct alt text', () => {
    render(<MemberCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.name);
    expect(image).toBeInTheDocument();
  });

  it('renders image with Wix media URL', () => {
    render(<MemberCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.name);
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('static.wixstatic.com%2Fmedia%2Fmember-logo.jpg'),
    );
  });

  it('renders name as h3 heading', () => {
    render(<MemberCard {...mockProps} />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: mockProps.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders address with correct styling', () => {
    render(<MemberCard {...mockProps} />);

    const address = screen.getByText(mockProps.address);
    expect(address).toBeInTheDocument();
    expect(address).toHaveClass('text-sm', 'font-normal');
  });

  it('renders "Find out more" CTA text', () => {
    render(<MemberCard {...mockProps} />);

    const cta = screen.getByText('Find out more');
    expect(cta).toBeInTheDocument();
  });

  it('applies correct CSS classes to link', () => {
    render(<MemberCard {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-center', 'font-semibold', 'md:text-md');
  });
});
