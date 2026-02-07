import HistoricalBusinesses, {
  Business,
} from '@app/components/Resources/HistoricalBusinesses';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mock } from 'node:test';
import { DEFAULT_WIX_IMAGE } from '@app/constants';

const mockBusinessesData: Business[] = [
  {
    name: 'Business One',
    description: 'Description for business one',
    website: 'https://business-one.com',
    image: DEFAULT_WIX_IMAGE,
  },
  {
    name: 'Business Two',
    description: 'Description for business two',
    website: 'https://business-two.com',
    image: DEFAULT_WIX_IMAGE,
  },
  {
    name: 'Business Three',
    description: 'Description for business three',
    website: 'https://business-three.com',
    image: DEFAULT_WIX_IMAGE,
  },
];

describe('HistoricalBusinesses', () => {
  it('renders all business cards', () => {
    render(<HistoricalBusinesses businessesData={mockBusinessesData} />);
    mockBusinessesData.forEach((business: Business) => {
      const cards = screen.getAllByTestId(business.name);
      expect(cards).toHaveLength(2);
      cards.forEach((card: HTMLElement) => {
        expect(card).toBeInTheDocument();
      });
    });
  });

  it('displays first business image by default', () => {
    render(<HistoricalBusinesses businessesData={mockBusinessesData} />);

    const image = screen.getByAltText(mockBusinessesData[0].name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fimages%2Fplaceholder.jpg&w=32&q=75',
    );
  });

  it('renders business descriptions', () => {
    render(<HistoricalBusinesses businessesData={mockBusinessesData} />);

    mockBusinessesData.forEach((business: Business) => {
      const cards = screen.getAllByText(business.description);
      expect(cards).toHaveLength(2);
      cards.forEach((card: HTMLElement) => {
        expect(card).toBeInTheDocument();
      });
    });
  });

  it('renders business website links', () => {
    render(<HistoricalBusinesses businessesData={mockBusinessesData} />);

    mockBusinessesData.forEach((business: Business) => {
      const cards = screen.getAllByTestId(business.name);
      expect(cards).toHaveLength(2);
      cards.forEach((card: HTMLElement) => {
        const link = card.querySelector('a');
        expect(link).toHaveAttribute('href', business.website);
      });
    });
  });

  it('image has correct attributes', () => {
    render(<HistoricalBusinesses businessesData={mockBusinessesData} />);

    const image = screen.getByAltText(mockBusinessesData[0].name);
    expect(image).toHaveAttribute(
      'width',
      `${mockBusinessesData[0].image.width}`,
    );
    expect(image).toHaveAttribute(
      'height',
      `${mockBusinessesData[0].image.height}`,
    );
    expect(image).toHaveClass(
      'w-full h-full object-center rounded-lg aspect-video',
    );
  });

  it('returns null when businessesData is empty', () => {
    const { container } = render(<HistoricalBusinesses businessesData={[]} />);

    expect(container.firstChild).toBeNull();
  });
});
