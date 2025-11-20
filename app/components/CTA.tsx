'use client';

import React from 'react';
import { Button } from 'flowbite-react';

const CTA = ({ image }: { image: string }) => {
  return (
    <>
      <div
        className="container text-center text-white px-[5%] mt-16 bg-cover bg-center bg-no-repeat py-12 md:py-18"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h1 className="mb-2 text-2xl font-bold md:mb-3">Join the Chamber</h1>
        <p className="text-md">
          Unlock opportunities for your business and connect with local
          entrepreneurs.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button
            color="dark"
            size="lg"
            data-testid="cta-apply-btn"
            href="/join"
          >
            Apply now
          </Button>
        </div>
      </div>
    </>
  );
};

export default CTA;
