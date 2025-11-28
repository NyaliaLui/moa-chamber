import CulturalLandmarks, {
  TabContent,
} from '@app/components/Resources/CulturalLandmarks';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DEFAULT_WIX_IMAGE } from '@app/constants';

const mockTabsData: TabContent[] = [
  {
    id: 'culture-1',
    name: 'Culture Tab 1',
    heading: 'Culture Heading 1',
    description: 'Culture description 1',
    ctaLink: '/culture-1',
    ctaLabel: 'Learn More 1',
    image: DEFAULT_WIX_IMAGE,
  },
  {
    id: 'culture-2',
    name: 'Culture Tab 2',
    heading: 'Culture Heading 2',
    description: 'Culture description 2',
    ctaLink: '/culture-2',
    ctaLabel: 'Learn More 2',
    image: DEFAULT_WIX_IMAGE,
  },
  {
    id: 'culture-3',
    name: 'Culture Tab 3',
    heading: 'Culture Heading 3',
    description: 'Culture description 3',
    ctaLink: '/culture-3',
    ctaLabel: 'Learn More 3',
    image: DEFAULT_WIX_IMAGE,
  },
];

describe('CulturalLandmarks', () => {
  it('renders the CulturalLandmarks component', () => {
    render(<CulturalLandmarks tabsData={mockTabsData} />);

    expect(screen.getByText('Culture Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Culture Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Culture Tab 3')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    render(<CulturalLandmarks tabsData={mockTabsData} />);

    const tab1 = screen.getByTestId('culture-tab-culture-1');
    const tab2 = screen.getByTestId('culture-tab-culture-2');
    const tab3 = screen.getByTestId('culture-tab-culture-3');

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
  });

  it('renders CultureBox component with correct props', () => {
    render(<CulturalLandmarks tabsData={mockTabsData} />);

    const cultureBox = screen.getByTestId('culture-box');
    expect(cultureBox).toBeInTheDocument();

    // Check that it contains the first tab's content
    expect(screen.getByText('Culture Heading 1')).toBeInTheDocument();
    expect(screen.getByAltText('Culture Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Culture description 1')).toBeInTheDocument();
    expect(screen.getByText('Learn More 1')).toBeInTheDocument();
  });

  it('returns null when tabsData is empty', () => {
    const { container } = render(<CulturalLandmarks tabsData={[]} />);

    expect(container.firstChild).toBeNull();
  });
});
