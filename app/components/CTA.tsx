'use client';

import React from 'react';
import { Button } from 'flowbite-react';

import { useWixCta } from '@app/hooks/Wix';
import testIds from '@app/test-ids';

import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

export default function CTA() {
  const { data: ctaImage, isLoading, error } = useWixCta();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!ctaImage) {
    return <ErrorState error={new Error('CTA image is undefined')} />;
  }

  return (
    <>
      <div
        className="container text-center text-white px-[5%] mt-16 bg-cover bg-center bg-no-repeat py-12 md:py-18 relative"
        style={{
          backgroundImage: `url(${ctaImage.url})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h1 className="mb-2 text-2xl font-bold md:mb-3">Join the Chamber</h1>
          <p className="text-md">
            Unlock opportunities for your business and connect with local
            entrepreneurs.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              color="dark"
              size="lg"
              data-testid={testIds.CTA.APPLY_BTN}
              href="/join"
            >
              Apply now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
