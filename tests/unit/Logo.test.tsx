import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Logo } from '@app/components/Logo/Logo';
import { LOGO_IMAGE } from '@app/constants';

describe('Logo', () => {
  it('renders the logo component', () => {
    render(<Logo enableLightOutline={true} />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<Logo enableLightOutline={true} />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute('alt', 'MOA Chamber Logo');
  });

  it('renders image with correct src', () => {
    render(<Logo enableLightOutline={true} />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute(
      'src',
      expect.stringContaining(LOGO_IMAGE.outline.light),
    );
  });

  it('renders image with correct dimensions', () => {
    render(<Logo enableLightOutline={true} />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toHaveAttribute('width', `${LOGO_IMAGE.width}`);
    expect(logo).toHaveAttribute('height', `${LOGO_IMAGE.height}`);
  });

  it('image is visible', () => {
    render(<Logo enableLightOutline={true} />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeVisible();
  });
});
