import BusinessBox, { Business } from '@app/components/Resources/BusinessBox';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mock } from 'node:test';

const mockBusinessesData: Business[] = [
  {
    name: 'Business One',
    description: 'Description for business one',
    website: 'https://business-one.com',
    image: '/images/business-1.jpg',
  },
  {
    name: 'Business Two',
    description: 'Description for business two',
    website: 'https://business-two.com',
    image: '/images/business-2.jpg',
  },
  {
    name: 'Business Three',
    description: 'Description for business three',
    website: 'https://business-three.com',
    image: '/images/business-3.jpg',
  },
];

describe('BusinessBox', () => {
  it('renders the BusinessBox component', () => {
    render(<BusinessBox businessesData={mockBusinessesData} />);

    mockBusinessesData.forEach((business: Business) => {
      expect(screen.getByTestId(business.name)).toBeInTheDocument();
    });
  });

  it('renders all business cards', () => {
    render(<BusinessBox businessesData={mockBusinessesData} />);
    mockBusinessesData.forEach((business: Business) => {
      const card = screen.getByTestId(business.name);
      expect(card).toBeInTheDocument();
    });
  });

  it('displays first business image by default', () => {
    render(<BusinessBox businessesData={mockBusinessesData} />);

    const image = screen.getByAltText(mockBusinessesData[0].name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fimages%2Fbusiness-1.jpg&w=2048&q=75',
    );
  });

  it('renders business descriptions', () => {
    render(<BusinessBox businessesData={mockBusinessesData} />);

    mockBusinessesData.forEach((business: Business) => {
      expect(screen.getByText(business.description)).toBeInTheDocument();
    });
  });

  it('renders business website links', () => {
    render(<BusinessBox businessesData={mockBusinessesData} />);

    mockBusinessesData.forEach((business: Business) => {
      const card = screen.getByTestId(business.name);
      const link = card.querySelector('a');
      expect(link).toHaveAttribute('href', business.website);
    });
  });

  it('image has correct attributes', () => {
    render(<BusinessBox businessesData={mockBusinessesData} />);

    const image = screen.getByAltText(mockBusinessesData[0].name);
    expect(image).toHaveAttribute('width', '1000');
    expect(image).toHaveAttribute('height', '1000');
    expect(image).toHaveClass('w-full h-full object-contain aspect-square');
  });

  it('returns null when businessesData is empty', () => {
    const { container } = render(<BusinessBox businessesData={[]} />);

    expect(container.firstChild).toBeNull();
  });
});
