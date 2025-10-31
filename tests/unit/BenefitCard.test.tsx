import BenefitCard from '@app/components/Join/BenefitCard';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('BenefitCard', () => {
  const mockProps = {
    message: 'Access to exclusive networking events',
    alt: 'Networking icon',
  };

  it('renders the component with all props', () => {
    render(<BenefitCard {...mockProps} />);

    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.alt)).toBeInTheDocument();
  });

  it('renders message as h3 heading', () => {
    render(<BenefitCard {...mockProps} />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: mockProps.message,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<BenefitCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.alt);
    expect(image).toBeInTheDocument();
  });

  it('renders image with correct src', () => {
    render(<BenefitCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.alt);
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('relume-icon.svg'),
    );
  });

  it('renders image with correct dimensions', () => {
    render(<BenefitCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.alt);
    expect(image).toHaveAttribute('width', '24');
    expect(image).toHaveAttribute('height', '24');
  });

  it('applies correct CSS classes to heading', () => {
    render(<BenefitCard {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveClass(
      'mb-3',
      'text-center',
      'text-xl',
      'font-bold',
      'md:mb-4',
      'md:text-2xl',
    );
  });

  it('applies correct CSS classes to wrapper div', () => {
    const { container } = render(<BenefitCard {...mockProps} />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-full');
  });

  it('renders image with correct CSS classes', () => {
    render(<BenefitCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.alt);
    expect(image).toHaveClass('size-12');
  });

  it('message text is centered', () => {
    render(<BenefitCard {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveClass('text-center');
  });

  it('image container has correct flexbox classes', () => {
    const { container } = render(<BenefitCard {...mockProps} />);

    const imageContainer = container.querySelector('.flex.justify-center');
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass('mb-5', 'md:mb-6');
  });

  it('renders message with long text', () => {
    const customProps = {
      ...mockProps,
      message:
        'This is a very long benefit message that describes multiple advantages and opportunities available to members',
    };

    render(<BenefitCard {...customProps} />);
    expect(
      screen.getByText(
        'This is a very long benefit message that describes multiple advantages and opportunities available to members',
      ),
    ).toBeInTheDocument();
  });

  it('renders message with special characters', () => {
    const customProps = {
      ...mockProps,
      message: 'Save 10-20% on products & services!',
    };

    render(<BenefitCard {...customProps} />);
    expect(
      screen.getByText('Save 10-20% on products & services!'),
    ).toBeInTheDocument();
  });
});
