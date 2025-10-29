import Benefits from '@app/components/Benefits';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Benefits', () => {
  it('renders the Benefits component', () => {
    render(<Benefits />);

    expect(
      screen.getByText('Benefits of Chamber Membership'),
    ).toBeInTheDocument();
  });

  it('renders main heading as h1', () => {
    render(<Benefits />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Benefits of Chamber Membership',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders Thrive label', () => {
    render(<Benefits />);

    expect(screen.getByText('Thrive')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Benefits />);

    expect(
      screen.getByText(
        'Strategic support for local entrepreneurs and business owners',
      ),
    ).toBeInTheDocument();
  });

  it('renders Join the chamber button', () => {
    render(<Benefits />);

    const button = screen.getByText('Join the chamber');
    expect(button).toBeInTheDocument();
  });

  it('renders all three benefit cards', () => {
    render(<Benefits />);

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
    render(<Benefits />);

    expect(screen.getByText('Promote')).toBeInTheDocument();
    expect(
      screen.getByText('Amplify your business visibility'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Showcase your brand through chamber-sponsored events'),
    ).toBeInTheDocument();
  });

  it('renders Connect benefit card with correct content', () => {
    render(<Benefits />);

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
    render(<Benefits />);

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
    render(<Benefits />);

    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    // Should have 3 h2 headings for the benefit cards
    expect(h2Headings.length).toBeGreaterThanOrEqual(3);
  });

  it('renders all benefit card images', () => {
    render(<Benefits />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);

    expect(screen.getByAltText('Benefits Promote img')).toBeInTheDocument();
    expect(screen.getByAltText('Benefits Connect img')).toBeInTheDocument();
    expect(screen.getByAltText('Benefits Serve img')).toBeInTheDocument();
  });
});
