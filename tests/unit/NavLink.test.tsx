import { NavLink } from '@app/components/Layout/NavBar/NavLink';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('NavLink', () => {
  const mockProps = {
    href: '/about',
    className: 'text-blue-500',
    children: 'About Us',
  };

  it('renders the NavLink component', () => {
    render(<NavLink {...mockProps} />);

    const link = screen.getByRole('link', { name: 'About Us' });
    expect(link).toBeInTheDocument();
  });

  it('renders with correct href', () => {
    render(<NavLink {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders with correct className', () => {
    render(<NavLink {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-blue-500');
  });

  it('renders children text', () => {
    render(<NavLink {...mockProps} />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('link is clickable', () => {
    render(<NavLink {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toBeVisible();
  });
});
