import BenefitCard, { IconType } from '@app/components/Join/BenefitCard';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('BenefitCard', () => {
  const mockProps = {
    message: 'Access to exclusive networking events',
    icon: 'megaphone' as IconType,
  };

  it('renders the component with all props', () => {
    render(<BenefitCard {...mockProps} />);

    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
  });

  it('renders message as h3 heading', () => {
    render(<BenefitCard {...mockProps} />);

    const heading = screen.getByRole('heading', {
      level: 3,
      name: mockProps.message,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders icon component', () => {
    const { container } = render(<BenefitCard {...mockProps} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders megaphone icon', () => {
    const { container } = render(
      <BenefitCard message="Test message" icon="megaphone" />,
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders handshake icon', () => {
    const { container } = render(
      <BenefitCard message="Test message" icon="handshake" />,
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders heart icon', () => {
    const { container } = render(
      <BenefitCard message="Test message" icon="heart" />,
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders cash icon', () => {
    const { container } = render(
      <BenefitCard message="Test message" icon="cash" />,
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
