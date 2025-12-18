import React from 'react';
import testIds from '@app/test-ids';

export default function LoadingState() {
  return (
    <section
      className="w-full h-dvh flex items-center justify-center bg-[#1a56db]"
      data-testid={testIds.LOADING_STATE.CONTAINER}
    >
      <div className="container mx-auto text-center">
        <p
          className="text-lg text-white mb-6"
          data-testid={testIds.LOADING_STATE.TEXT}
        >
          Loading ...
        </p>
      </div>
    </section>
  );
}
