import CTA from '@app/components/CTA';
import { PLACEHOLDER_IMAGE } from '@app/constants';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CTA', () => {
  it('renders the CTA component', () => {
    render(<CTA image={PLACEHOLDER_IMAGE} />);

    expect(screen.getByText('Join the Chamber')).toBeInTheDocument();
  });

  it('renders heading as h1', () => {
    render(<CTA image={PLACEHOLDER_IMAGE} />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Join the Chamber',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<CTA image={PLACEHOLDER_IMAGE} />);

    expect(
      screen.getByText(
        'Unlock opportunities for your business and connect with local entrepreneurs.',
      ),
    ).toBeInTheDocument();
  });

  it('renders Apply now button', () => {
    render(<CTA image={PLACEHOLDER_IMAGE} />);

    const button = screen.getByText('Apply now');
    expect(button).toBeInTheDocument();
  });

  it('renders with background image', () => {
    const { container } = render(<CTA image={PLACEHOLDER_IMAGE} />);

    const ctaDiv = container.querySelector('.bg-cover');
    expect(ctaDiv).toHaveStyle({
      backgroundImage: `url(${PLACEHOLDER_IMAGE})`,
    });
  });
});
