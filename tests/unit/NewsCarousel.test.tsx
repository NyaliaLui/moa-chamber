import NewsCarousel from '@app/components/NewsCarousel';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEFAULT_WIX_IMAGE } from '@app/constants';

const clientWidth = 1000;
const scrollLeft = 500;
const percentageScroll = 0.8;

describe('NewsCarousel', () => {
  // Mock HTMLElement.scrollTo
  beforeEach(() => {
    // Create mock scrollTo method
    Element.prototype.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockNewsCarouselData = [
    {
      id: '1',
      image: DEFAULT_WIX_IMAGE,
      heading: 'First News Article',
      subHeading: 'First article description',
      authorImage: DEFAULT_WIX_IMAGE,
      authorName: 'John Doe',
      publishDate: '2024-01-15',
      readTime: '5',
      href: '/news/first-article',
    },
    {
      id: '2',
      image: DEFAULT_WIX_IMAGE,
      heading: 'Second News Article',
      subHeading: 'Second article description',
      authorImage: DEFAULT_WIX_IMAGE,
      authorName: 'Jane Smith',
      publishDate: '2024-01-20',
      readTime: '7',
      href: '/news/second-article',
    },
    {
      id: '3',
      image: DEFAULT_WIX_IMAGE,
      heading: 'Third News Article',
      subHeading: 'Third article description',
      authorImage: DEFAULT_WIX_IMAGE,
      authorName: 'Mike Johnson',
      publishDate: '2024-01-25',
      readTime: '3',
      href: '/news/third-article',
    },
  ];

  it('renders the component with heading', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    const heading = screen.getByText('Chamber News');
    expect(heading).toBeInTheDocument();
  });

  it('renders all news articles', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    expect(screen.getByText('First News Article')).toBeInTheDocument();
    expect(screen.getByText('Second News Article')).toBeInTheDocument();
    expect(screen.getByText('Third News Article')).toBeInTheDocument();
  });

  it('renders View all button on desktop', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    const viewAllButtons = screen.getAllByText('View all');
    expect(viewAllButtons.length).toBeGreaterThan(0);
  });

  it('View all buttons link to /news', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    const links = screen.getAllByRole('link', { name: /view all/i });
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/news');
    });
  });

  it('renders pagination dots for each article', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    // Find all pagination dots (small circular divs)
    const dots = screen.getAllByTestId(testIds.HOME_PAGE.NEWS_CAROUSEL_DOTS);
    expect(dots.length).toBe(mockNewsCarouselData.length);
  });

  it('renders navigation arrow buttons', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    const leftButton = screen.getByLabelText('Scroll left');
    const rightButton = screen.getByLabelText('Scroll right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });

  it('scroll buttons are clickable', () => {
    render(<NewsCarousel newsArticles={mockNewsCarouselData} />);

    const leftButton = screen.getByLabelText('Scroll left');
    const rightButton = screen.getByLabelText('Scroll right');

    expect(leftButton).not.toBeDisabled();
    expect(rightButton).not.toBeDisabled();

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);
  });

  it('calls scrollTo when clicking left arrow', () => {
    const { container } = render(
      <NewsCarousel newsArticles={mockNewsCarouselData} />,
    );

    const scrollContainer = container.querySelector('.overflow-x-auto');
    const leftButton = screen.getByLabelText('Scroll left');

    // Mock the scroll container properties
    Object.defineProperty(scrollContainer, 'clientWidth', {
      configurable: true,
      value: clientWidth,
    });
    Object.defineProperty(scrollContainer, 'scrollLeft', {
      configurable: true,
      value: scrollLeft,
    });

    fireEvent.click(leftButton);

    expect(scrollContainer?.scrollTo).toHaveBeenCalledWith({
      left: scrollLeft - clientWidth * percentageScroll,
      behavior: 'smooth',
    });
  });

  it('calls scrollTo when clicking right arrow', () => {
    const { container } = render(
      <NewsCarousel newsArticles={mockNewsCarouselData} />,
    );

    const scrollContainer = container.querySelector('.overflow-x-auto');
    const rightButton = screen.getByLabelText('Scroll right');

    // Mock the scroll container properties
    Object.defineProperty(scrollContainer, 'clientWidth', {
      configurable: true,
      value: clientWidth,
    });
    Object.defineProperty(scrollContainer, 'scrollLeft', {
      configurable: true,
      value: scrollLeft,
    });

    fireEvent.click(rightButton);

    expect(scrollContainer?.scrollTo).toHaveBeenCalledWith({
      left: scrollLeft + clientWidth * percentageScroll,
      behavior: 'smooth',
    });
  });

  it('renders with empty news articles array', () => {
    render(<NewsCarousel newsArticles={[]} />);

    const heading = screen.getByText('Chamber News');
    expect(heading).toBeInTheDocument();

    // Should still render navigation but no articles
    expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
  });
});
