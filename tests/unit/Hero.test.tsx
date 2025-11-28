import Hero from '@app/components/Hero';
import { DEFAULT_WIX_IMAGE } from '@app/constants';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Hero', () => {
  it('renders the Hero component', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    expect(
      screen.getByText('Empowering businesses in Meriden and Ozawkie'),
    ).toBeInTheDocument();
  });

  it('renders main heading as h1', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Empowering businesses in Meriden and Ozawkie',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    expect(
      screen.getByText(
        'We connect local entrepreneurs and support economic growth. Join our community and unlock opportunities for your business.',
      ),
    ).toBeInTheDocument();
  });

  it('renders Join Us button', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const button = screen.getByText('Join Us');
    expect(button).toBeInTheDocument();
  });

  it('Join Us button has correct href', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const button = screen.getByText('Join Us').closest('a');
    expect(button).toHaveAttribute('href', '/join');
  });

  it('renders Who we are button', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const button = screen.getByText('Who we are');
    expect(button).toBeInTheDocument();
  });

  it('Who we are button has correct href', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const button = screen.getByText('Who we are').closest('a');
    expect(button).toHaveAttribute('href', '/about');
  });

  it('renders hero image', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const image = screen.getByAltText('Hero image');
    expect(image).toBeInTheDocument();
  });

  it('hero image has correct src', () => {
    render(<Hero image={DEFAULT_WIX_IMAGE} />);

    const image = screen.getByAltText('Hero image');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('placeholder.jpg'),
    );
  });
});
