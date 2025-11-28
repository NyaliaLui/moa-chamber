import NewsCarouselCard from '@app/components/News/NewsCarouselCard';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEFAULT_WIX_IMAGE } from '@app/constants';

describe('NewsCarouselCard', () => {
  const mockProps = {
    image: DEFAULT_WIX_IMAGE,
    heading: 'Test News Heading',
    subHeading: 'Test news description content',
    authorImage: DEFAULT_WIX_IMAGE,
    authorName: 'John Doe',
    publishDate: '2024-01-15',
    readTime: '5',
    href: '/news/test-article',
  };

  it('renders the component with all props', () => {
    render(<NewsCarouselCard {...mockProps} />);

    expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subHeading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.authorName)).toBeInTheDocument();
  });

  it('renders the main image with correct alt attributes', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.heading);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', mockProps.heading);
  });

  it('renders the author image with correct alt attributes', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const authorImage = screen.getByAltText(mockProps.authorName);
    expect(authorImage).toBeInTheDocument();
    expect(authorImage).toHaveAttribute('alt', mockProps.authorName);
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

  it('renders subHeading text', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const subHeading = screen.getByText(mockProps.subHeading);
    expect(subHeading).toBeInTheDocument();
    expect(subHeading.tagName).toBe('P');
  });

  it('renders author information', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const authorSection = screen.getByTestId(
      testIds.HOME_PAGE.NEWS_CAROUSEL_CARD_AUTHOR,
    );
    expect(authorSection).toBeInTheDocument();
    expect(screen.getByText(mockProps.authorName)).toBeInTheDocument();
  });

  it('renders read time with correct format', () => {
    render(<NewsCarouselCard {...mockProps} />);

    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('applies correct CSS classes for layout', () => {
    render(<NewsCarouselCard {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('block', 'h-full', 'group');
  });
});
