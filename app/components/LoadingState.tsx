import React from 'react';
import testIds from '@app/test-ids';

interface LoadingStateProps {
  className?: string;
}

export default function LoadingState({
  className = 'px-[5%] mt-16',
}: LoadingStateProps) {
  return (
    <section
      className={className}
      data-testid={testIds.LOADING_STATE.CONTAINER}
    >
      <div className="container mx-auto text-center">
        <p className="text-lg" data-testid={testIds.LOADING_STATE.TEXT}>
          Loading...
        </p>
      </div>
    </section>
  );
}
