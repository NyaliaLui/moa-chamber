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
    expect(loadingText).toHaveTextContent('Loading ...');
  });

  it('renders with default className', () => {
    render(<LoadingState />);

    const container = screen.getByTestId(testIds.LOADING_STATE.CONTAINER);
    expect(container).toHaveClass(
      'w-full h-dvh flex items-center justify-center bg-[#1a56db]',
    );
  });

  it('renders loading text with correct styling', () => {
    render(<LoadingState />);

    const loadingText = screen.getByTestId(testIds.LOADING_STATE.TEXT);
    expect(loadingText).toHaveClass('text-lg');
  });
});
