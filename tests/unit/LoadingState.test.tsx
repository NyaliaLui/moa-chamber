import LoadingState from '@app/components/LoadingState';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('LoadingState', () => {
  it('renders the loading state component', () => {
    render(<LoadingState />);

    const container = screen.getByTestId(testIds.LOADING_STATE.CONTAINER);
    const loadingText = screen.getByTestId(testIds.LOADING_STATE.TEXT);

    expect(container).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveTextContent('Loading...');
  });

  it('renders with default className', () => {
    render(<LoadingState />);

    const container = screen.getByTestId(testIds.LOADING_STATE.CONTAINER);
    expect(container).toHaveClass('px-[5%]');
    expect(container).toHaveClass('mt-16');
  });

  it('renders with custom className', () => {
    render(<LoadingState className="custom-class" />);

    const container = screen.getByTestId(testIds.LOADING_STATE.CONTAINER);
    expect(container).toHaveClass('custom-class');
    expect(container).not.toHaveClass('px-[5%]');
    expect(container).not.toHaveClass('mt-16');
  });

  it('renders loading text with correct styling', () => {
    render(<LoadingState />);

    const loadingText = screen.getByTestId(testIds.LOADING_STATE.TEXT);
    expect(loadingText).toHaveClass('text-lg');
  });

  it('renders loading text content correctly', () => {
    render(<LoadingState />);

    const loadingText = screen.getByTestId(testIds.LOADING_STATE.TEXT);
    expect(loadingText).toHaveTextContent('Loading...');
  });
});
