import { Logo } from '@app/components/Logo/Logo';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Logo', () => {
  it('renders the logo component', () => {
    render(<Logo />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<Logo />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute('alt', 'MOA Chamber Logo');
  });

  it('renders image with correct src', () => {
    render(<Logo />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute(
      'src',
      expect.stringContaining('logo-image.svg'),
    );
  });

  it('renders image with correct width', () => {
    render(<Logo />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute('width', '70');
  });

  it('renders image with correct height', () => {
    render(<Logo />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute('height', '36');
  });

  it('image is visible', () => {
    render(<Logo />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeVisible();
  });
});
