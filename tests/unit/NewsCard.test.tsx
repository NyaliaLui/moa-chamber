import NewsCard from '@app/components/News/NewsCard';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('NewsCard', () => {
  const mockProps = {
    image: '/news/article-image.jpg',
    heading: 'Chamber Announces New Business Initiative',
    description:
      'The Meriden-Ozawkie Area Chamber has launched a new program to support local businesses.',
    slug: 'new-business-initiative',
    readTimeM: 5,
  };

  it('renders the component with all props', () => {
    render(<NewsCard {...mockProps} />);

    expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText('5min read')).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<NewsCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.heading);
    expect(image).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(<NewsCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.heading);
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('article-image.jpg'),
    );
  });

  it('renders heading as h3', () => {
    render(<NewsCard {...mockProps} />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: mockProps.heading,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders description paragraph', () => {
    render(<NewsCard {...mockProps} />);

    const description = screen.getByText(mockProps.description);
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
  });

  it('renders read time with correct format', () => {
    render(<NewsCard {...mockProps} />);

    const readTime = screen.getByText('5min read');
    expect(readTime).toBeInTheDocument();
    expect(readTime).toHaveClass('text-sm', 'font-semibold');
  });

  it('renders "Read more" CTA link', () => {
    render(<NewsCard {...mockProps} />);

    const readMoreLink = screen.getByText('Read more');
    expect(readMoreLink).toBeInTheDocument();
  });

  it('Read more link has correct href', () => {
    render(<NewsCard {...mockProps} />);

    const ctaLink = screen.getByTestId(testIds.NEWS_PAGE.NEWS_ITEM_CTA);
    expect(ctaLink).toHaveAttribute('href', `/news/${mockProps.slug}`);
  });

  it('renders all three links', () => {
    render(<NewsCard {...mockProps} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3); // Image link, heading link, and Read more link
  });

  it('image has correct dimensions', () => {
    render(<NewsCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.heading);
    expect(image).toHaveAttribute('width', '1280');
    expect(image).toHaveAttribute('height', '720');
  });
});
