import { DateDisplay } from '@app/components/News/DateDisplay';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('DateDisplay', () => {
  it('formats date correctly in en-GB format', () => {
    const dateString = '2024-01-15';
    render(<DateDisplay dateString={dateString} />);

    const dateElement = screen.getByText('15 Jan 2024');
    expect(dateElement).toBeInTheDocument();
  });

  it('formats different dates correctly', () => {
    const { rerender } = render(<DateDisplay dateString="2024-03-25" />);
    expect(screen.getByText('25 Mar 2024')).toBeInTheDocument();

    rerender(<DateDisplay dateString="2024-12-01" />);
    expect(screen.getByText('1 Dec 2024')).toBeInTheDocument();
  });

  it('handles single-digit days without leading zero', () => {
    const dateString = '2024-02-05';
    render(<DateDisplay dateString={dateString} />);

    const dateElement = screen.getByText('5 Feb 2024');
    expect(dateElement).toBeInTheDocument();
  });

  it('handles leap year dates', () => {
    const dateString = '2024-02-29';
    render(<DateDisplay dateString={dateString} />);

    const dateElement = screen.getByText('29 Feb 2024');
    expect(dateElement).toBeInTheDocument();
  });
});
