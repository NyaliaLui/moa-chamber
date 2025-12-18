'use client';

import { useEffect } from 'react';

export default function TestErrorPage() {
  useEffect(() => {
    throw new Error('This is a test error for e2e testing');
  }, []);

  return null;
}
