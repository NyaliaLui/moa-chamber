'use client';

import React from 'react';
import { Button } from 'flowbite-react';

const CTA = () => {
  return (
    <section className="px-[5%] mt-16">
      <div className="container text-center">
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
    </section>
  );
};

export default CTA;
