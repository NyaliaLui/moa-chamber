import CommunityTreasures, {
  TabContent,
} from '@app/components/Resources/CommunityTreasures';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEFAULT_WIX_IMAGE } from '@app/constants';

const mockTabsData: TabContent[] = [
  {
    id: 'culture-1',
    heading: 'Culture Heading 1',
    description: 'Culture description 1',
    ctaLink: '/culture-1',
    ctaLabel: 'Learn More 1',
    image: DEFAULT_WIX_IMAGE,
  },
  {
    id: 'culture-2',
    heading: 'Culture Heading 2',
    description: 'Culture description 2',
    ctaLink: '/culture-2',
    ctaLabel: 'Learn More 2',
    image: DEFAULT_WIX_IMAGE,
  },
  {
    id: 'culture-3',
    heading: 'Culture Heading 3',
    description: 'Culture description 3',
    ctaLink: '/culture-3',
    ctaLabel: 'Learn More 3',
    image: DEFAULT_WIX_IMAGE,
  },
];

describe('CommunityTreasures', () => {
  it('renders the CommunityTreasures component', () => {
    render(<CommunityTreasures cultureResources={mockTabsData} />);

    // Headings appear in both tab buttons and CultureBox, so use getAllByText
    expect(screen.getAllByText('Culture Heading 1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Culture Heading 2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Culture Heading 3').length).toBeGreaterThan(0);
  });

  it('renders all tab buttons', () => {
    render(<CommunityTreasures cultureResources={mockTabsData} />);

    const tab1 = screen.getByTestId('culture-tab-culture-1');
    const tab2 = screen.getByTestId('culture-tab-culture-2');
    const tab3 = screen.getByTestId('culture-tab-culture-3');

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
  });

  it('renders CultureBox component with correct props', () => {
    render(<CommunityTreasures cultureResources={mockTabsData} />);

    const cultureBox = screen.getByTestId('culture-box');
    expect(cultureBox).toBeInTheDocument();

    // Check that it contains the first tab's content
    // Heading appears in both tab button and CultureBox h2
    expect(screen.getAllByText('Culture Heading 1').length).toBe(2);
    expect(screen.getByAltText('Culture Heading 1')).toBeInTheDocument();
    expect(screen.getByText('Culture description 1')).toBeInTheDocument();
    expect(screen.getByText('Learn More 1')).toBeInTheDocument();
  });

  it('returns null when cultureResources is empty', () => {
    const { container } = render(<CommunityTreasures cultureResources={[]} />);

    expect(container.firstChild).toBeNull();
  });
});
