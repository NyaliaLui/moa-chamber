import { CarouselClient } from '@app/components/Carousel/Carousel';

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Carousel Test', () => {
  it('Carousel exists', async () => {
    render(<CarouselClient />);
    const carousel = screen.getByTestId('carousel-client');
    expect(carousel).toBeInTheDocument();
  });
});
