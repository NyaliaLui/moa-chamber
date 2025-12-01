import React from 'react';
import testIds from '@app/test-ids';

interface ErrorStateProps {
  error?: Error | null;
  className?: string;
}

export default function ErrorState({
  error,
  className = 'px-[5%] mt-16',
}: ErrorStateProps) {
  const errorMessage = error?.message || 'An error occurred';

  return (
    <section className={className} data-testid={testIds.ERROR_STATE.CONTAINER}>
      <div className="container mx-auto text-center">
        <p
          className="text-lg text-red-600"
          data-testid={testIds.ERROR_STATE.TEXT}
        >
          Error: {errorMessage}
        </p>
      </div>
    </section>
  );
}
