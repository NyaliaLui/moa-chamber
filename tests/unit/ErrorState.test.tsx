import ErrorState from '@app/components/ErrorState';
import testIds from '@app/test-ids';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ErrorState', () => {
  it('renders the error state component with error message', () => {
    const error = new Error('Test error message');
    render(<ErrorState error={error} />);

    const container = screen.getByTestId(testIds.ERROR_STATE.CONTAINER);
    const errorText = screen.getByTestId(testIds.ERROR_STATE.TEXT);

    expect(container).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent('Error: Test error message');
  });

  it('renders default error message when no error is provided', () => {
    render(<ErrorState />);

    const errorText = screen.getByTestId(testIds.ERROR_STATE.TEXT);
    expect(errorText).toHaveTextContent('Error: An error occurred');
  });

  it('renders default error message when error is null', () => {
    render(<ErrorState error={null} />);

    const errorText = screen.getByTestId(testIds.ERROR_STATE.TEXT);
    expect(errorText).toHaveTextContent('Error: An error occurred');
  });

  it('renders with default className', () => {
    render(<ErrorState error={new Error('Test')} />);

    const container = screen.getByTestId(testIds.ERROR_STATE.CONTAINER);
    expect(container).toHaveClass('px-[5%]');
    expect(container).toHaveClass('mt-16');
  });

  it('renders with custom className', () => {
    render(
      <ErrorState error={new Error('Test')} className="custom-error-class" />,
    );

    const container = screen.getByTestId(testIds.ERROR_STATE.CONTAINER);
    expect(container).toHaveClass('custom-error-class');
    expect(container).not.toHaveClass('px-[5%]');
    expect(container).not.toHaveClass('mt-16');
  });

  it('renders error text with correct styling', () => {
    const error = new Error('Styled error');
    render(<ErrorState error={error} />);

    const errorText = screen.getByTestId(testIds.ERROR_STATE.TEXT);
    expect(errorText).toHaveClass('text-lg');
    expect(errorText).toHaveClass('text-red-600');
  });

  it('handles complex error messages', () => {
    const error = new Error(
      'Complex error: Something went wrong with the database connection',
    );
    render(<ErrorState error={error} />);

    const errorText = screen.getByTestId(testIds.ERROR_STATE.TEXT);
    expect(errorText).toHaveTextContent(
      'Error: Complex error: Something went wrong with the database connection',
    );
  });

  it('extracts message from Error object correctly', () => {
    const error = new Error('Network timeout');
    render(<ErrorState error={error} />);

    const errorText = screen.getByTestId(testIds.ERROR_STATE.TEXT);
    expect(errorText).toHaveTextContent('Error: Network timeout');
    expect(errorText).not.toHaveTextContent('[object Object]');
  });
});
