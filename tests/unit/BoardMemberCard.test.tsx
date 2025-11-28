import BoardMemberCard from '@app/components/About/BoardMemberCard';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('BoardMemberCard', () => {
  const mockProps = {
    name: 'Alice Johnson',
    role: 'Board Chair',
    employer: 'Tech Company Inc.',
  };

  it('renders the component with all props', () => {
    render(<BoardMemberCard {...mockProps} />);

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.role)).toBeInTheDocument();
    expect(screen.getByText(mockProps.employer)).toBeInTheDocument();
  });

  it('renders name as h1 heading', () => {
    render(<BoardMemberCard {...mockProps} />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: mockProps.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders role as paragraph', () => {
    render(<BoardMemberCard {...mockProps} />);

    const role = screen.getByText(mockProps.role);
    expect(role).toBeInTheDocument();
    expect(role.tagName).toBe('P');
  });

  it('renders employer as paragraph', () => {
    render(<BoardMemberCard {...mockProps} />);

    const employer = screen.getByText(mockProps.employer);
    expect(employer).toBeInTheDocument();
    expect(employer.tagName).toBe('P');
  });

  it('applies correct CSS classes for layout', () => {
    const { container } = render(<BoardMemberCard {...mockProps} />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-start');
  });

  it('renders heading with correct font styling classes', () => {
    render(<BoardMemberCard {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-base', 'md:text-lg', 'font-semibold');
  });

  it('renders all three text elements in correct order', () => {
    const { container } = render(<BoardMemberCard {...mockProps} />);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(mockProps.role);
    expect(paragraphs[1]).toHaveTextContent(mockProps.employer);
  });
});
