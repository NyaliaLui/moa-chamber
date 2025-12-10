import ChamberHighlight from '@app/components/ChamberHighlight';
import { Highlight } from '@app/hooks/Wix';
import { DEFAULT_WIX_IMAGE } from '@app/constants';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockHighlightData: Highlight = {
  image: DEFAULT_WIX_IMAGE,
  heading: 'Meriden Coffee Roasters',
  description:
    'Welcome to our newest chamber member! Meriden Coffee Roasters brings artisanal coffee roasting expertise to our community, offering premium locally-roasted beans and a warm gathering space for coffee enthusiasts.',
  website: 'https://meridencoffee.com',
  socialMediaHandles: [
    'https://www.facebook.com/meridencoffee',
    'https://www.instagram.com/meridencoffee',
    'https://x.com/meridencoffee',
    'https://www.linkedin.com/company/meridencoffee',
  ],
};

const mockHighlightDataNoSocial: Highlight = {
  image: DEFAULT_WIX_IMAGE,
  heading: 'Test Business',
  description: 'A test business description.',
  website: undefined,
  socialMediaHandles: undefined,
};

describe('ChamberHighlight', () => {
  it('renders the ChamberHighlight component', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    expect(screen.getByText('New member highlight')).toBeInTheDocument();
  });

  it('renders main heading as h3', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'New member highlight',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders business name heading as h2', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Meriden Coffee Roasters',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    expect(
      screen.getByText(/Welcome to our newest chamber member!/),
    ).toBeInTheDocument();
  });

  it('renders website link when provided', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    const websiteLink = screen.getByRole('link', { name: /Visit Website/i });
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute('href', 'https://meridencoffee.com');
    expect(websiteLink).toHaveAttribute('target', '_blank');
    expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render website link when not provided', () => {
    render(<ChamberHighlight highlightData={mockHighlightDataNoSocial} />);

    const websiteLink = screen.queryByRole('link', { name: /Visit Website/i });
    expect(websiteLink).not.toBeInTheDocument();
  });

  it('renders correct social media links', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    const twitterLink = screen.getByRole('link', { name: 'Twitter' });
    const linkedInLink = screen.getByRole('link', { name: 'LinkedIn' });

    expect(facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/meridencoffee',
    );
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/meridencoffee',
    );
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/meridencoffee');
    expect(linkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/meridencoffee',
    );
  });

  it('does not render social media icons when not provided', () => {
    render(<ChamberHighlight highlightData={mockHighlightDataNoSocial} />);

    const facebookLink = screen.queryByRole('link', { name: 'Facebook' });
    const instagramLink = screen.queryByRole('link', { name: 'Instagram' });

    expect(facebookLink).not.toBeInTheDocument();
    expect(instagramLink).not.toBeInTheDocument();
  });

  it('renders highlight image with correct attributes', () => {
    render(<ChamberHighlight highlightData={mockHighlightData} />);

    const image = screen.getByAltText('Meriden Coffee Roasters');
    expect(image).toBeInTheDocument();
  });

  it('renders with empty social media handles array', () => {
    const dataWithEmptyArray: Highlight = {
      ...mockHighlightData,
      socialMediaHandles: [],
    };

    render(<ChamberHighlight highlightData={dataWithEmptyArray} />);

    const facebookLink = screen.queryByRole('link', { name: 'Facebook' });
    expect(facebookLink).not.toBeInTheDocument();
  });

  it('handles Twitter.com URLs correctly', () => {
    const dataWithTwitter: Highlight = {
      ...mockHighlightData,
      socialMediaHandles: ['https://twitter.com/meridencoffee'],
    };

    render(<ChamberHighlight highlightData={dataWithTwitter} />);

    const twitterLink = screen.getByRole('link', { name: 'Twitter' });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/meridencoffee',
    );
  });
});
