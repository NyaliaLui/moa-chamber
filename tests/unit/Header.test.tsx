import Header from '@app/components/Layout/Header';
import testIds from '@app/utils/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders the header component', () => {
    render(<Header />);

    const header = screen.getByTestId(testIds.LAYOUT.HEADER);
    expect(header).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Header />);

    const logo = screen.getByAltText('MOA Chamber Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the NavBar component', () => {
    render(<Header />);

    const navbar = screen.getByTestId('navbar-test');
    expect(navbar).toBeInTheDocument();
  });

  it('renders "MOA Chamber" text', () => {
    render(<Header />);

    expect(screen.getByText('MOA Chamber')).toBeInTheDocument();
  });

  it('renders home link with correct href', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders h2 heading', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('logo and text are within a link', () => {
    render(<Header />);

    const link = screen.getByRole('link');
    const logo = screen.getByAltText('MOA Chamber Logo');
    const text = screen.getByText('MOA Chamber');

    expect(link).toContainElement(logo);
    expect(link).toContainElement(text);
  });
});
