import Benefits, { Benefit } from '@app/components/Benefits';
import { PLACEHOLDER_IMAGE } from '@app/constants';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockBenefitsData: Benefit[] = [
  {
    id: '1',
    heading: 'Amplify your business visibility',
    description: 'Showcase your brand through chamber-sponsored events',
    label: 'Promote',
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: '2',
    heading: 'Build powerful business relationships',
    description:
      'Create meaningful partnerships that drive local economic growth',
    label: 'Connect',
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: '3',
    heading: 'Contribute to community development',
    description:
      'Make a lasting impact through collaborative local initiatives',
    label: 'Serve',
    image: PLACEHOLDER_IMAGE,
  },
];

describe('Benefits', () => {
  it('renders the Benefits component', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    expect(
      screen.getByText('Benefits of Chamber Membership'),
    ).toBeInTheDocument();
  });

  it('renders main heading as h1', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Benefits of Chamber Membership',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    expect(
      screen.getByText(
        'Strategic support for local entrepreneurs and business owners',
      ),
    ).toBeInTheDocument();
  });

  it('renders Join the chamber button', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    const button = screen.getByText('Join the chamber');
    expect(button).toBeInTheDocument();
  });

  it('renders all three benefit cards', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    expect(
      screen.getByText('Amplify your business visibility'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Build powerful business relationships'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Contribute to community development'),
    ).toBeInTheDocument();
  });

  it('renders Promote benefit card with correct content', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    expect(screen.getByText('Promote')).toBeInTheDocument();
    expect(
      screen.getByText('Amplify your business visibility'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Showcase your brand through chamber-sponsored events'),
    ).toBeInTheDocument();
  });

  it('renders Connect benefit card with correct content', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    expect(screen.getByText('Connect')).toBeInTheDocument();
    expect(
      screen.getByText('Build powerful business relationships'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Create meaningful partnerships that drive local economic growth',
      ),
    ).toBeInTheDocument();
  });

  it('renders Serve benefit card with correct content', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    expect(screen.getByText('Serve')).toBeInTheDocument();
    expect(
      screen.getByText('Contribute to community development'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Make a lasting impact through collaborative local initiatives',
      ),
    ).toBeInTheDocument();
  });

  it('renders all benefit card headings as h2', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    // Should have 3 h2 headings for the benefit cards
    expect(h2Headings.length).toBeGreaterThanOrEqual(3);
  });

  it('renders all benefit card images', () => {
    render(<Benefits benefitsData={mockBenefitsData} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);

    expect(screen.getByAltText('Benefits Promote img')).toBeInTheDocument();
    expect(screen.getByAltText('Benefits Connect img')).toBeInTheDocument();
    expect(screen.getByAltText('Benefits Serve img')).toBeInTheDocument();
  });

  it('renders correct number of benefit cards based on data', () => {
    const customBenefitsData: Benefit[] = [
      {
        id: '1',
        heading: 'Test Heading',
        description: 'Test description',
        label: 'Test',
        image: PLACEHOLDER_IMAGE,
      },
    ];

    render(<Benefits benefitsData={customBenefitsData} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(1);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });
});
