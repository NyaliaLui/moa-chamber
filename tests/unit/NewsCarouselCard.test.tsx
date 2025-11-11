import NewsCarouselCard from '@app/components/Carousel/NewsCarouselCard';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('NewsCarouselCard', () => {
  const mockProps = {
    image: '/test-image.jpg',
    heading: 'Test News Heading',
    description: 'Test news description content',
    href: '/news/test-article',
  };

  it('renders the component with all props', () => {
    render(<NewsCarouselCard {...mockProps} />);

    expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('renders the image with correct src and alt attributes', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.heading);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockProps.heading);
  });

  it('renders a link with correct href', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockProps.href);
  });

  it('renders heading with correct text', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockProps.heading);
  });

  it('renders description text', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const description = screen.getByText(mockProps.description);
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
  });

  it('applies correct CSS classes for layout', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('block', 'h-full', 'group');
  });
});
