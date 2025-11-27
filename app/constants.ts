export const WIX_ACCESS_TOKEN = 'wix_accessToken';
export const WIX_REFRESH_TOKEN = 'wix_refreshToken';

export const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

export const LOGO_IMAGE = {
  light: '/images/MOA-Logo-Small.png',
  dark: '/images/MOA-Logo-Dark-Small.png',
};

export const NAVBAR_ITEMS = [
  { href: '/directory', label: 'Our Members' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/news', label: 'News' },
  { href: '/resources', label: 'Community Resources' },
  { href: '/about', label: 'About Us' },
];

export const PAYPAL_URL = 'https://www.paypal.com/ncp/payment/7TMP7X7UP7TLS';

export const DEFAULTS = {
  home: {
    hero: {
      image: PLACEHOLDER_IMAGE,
    },
    benefit: {
      heading: 'Sample Heading',
      description: 'Sample description',
      label: 'Sample',
      image: PLACEHOLDER_IMAGE,
    },
    testimonial: {
      quote: 'Sample testimonial quote',
      name: 'Sample Name',
      businessName: 'Sample Business',
      businessRole: 'Sample Role',
      image: PLACEHOLDER_IMAGE,
    },
    cta: {
      image: PLACEHOLDER_IMAGE,
    },
    news: {
      heading: 'Sample News Heading',
      subHeading: 'Sample news description',
      authorName: 'Sample Author',
      publishDate: 'Jan 1, 2024',
      readTime: '5 min read',
      image: PLACEHOLDER_IMAGE,
      authorImage: PLACEHOLDER_IMAGE,
      slug: 'sample',
    },
  },
  calendar: {
    calendarSrc: '',
  },
  news: {
    image: PLACEHOLDER_IMAGE,
    heading: 'Sample News Heading',
    subHeading: 'Sample news description',
    slug: 'sample-news',
    readTimeM: 5,
    article: {
      _id: '1234567890',
      image: PLACEHOLDER_IMAGE,
      heading: 'Sample News Heading',
      description: 'Sample news description',
      slug: 'sample-news',
      readTimeM: 5,
      readTime: 5,
      publishDate: 'Jan 1, 2024',
      longDescription:
        'This is a sample long description for the news article. It contains detailed information about the topic.',
      caption: 'Sample image caption',
      authorName: 'Sample Author',
      authorRole: 'Sample Role',
      authorImage: PLACEHOLDER_IMAGE,
      gallery: [],
    },
  },
  project: {
    _id: '1234567890',
    title: 'Sample Project',
    longDescription: 'Sample project description',
    email: 'sample@example.com',
    website: 'https://example.com',
    phoneNumber: '(555) 123-4567',
    address: '123 Sample St, City, ST 12345',
    slug: 'sample-project',
  },
  resources: {
    culture: {
      name: 'Sample Landmark',
      heading: 'Sample heading',
      description: 'Sample description',
      ctaLink: '',
      ctaLabel: 'CTA',
      image: PLACEHOLDER_IMAGE,
    },
    business: {
      name: 'Sample Business',
      description: 'Sample description',
      website: '',
      image: PLACEHOLDER_IMAGE,
    },
  },
  team: {
    staff: {
      name: 'Sample Staff Name',
      image: PLACEHOLDER_IMAGE,
      role: 'Sample Role',
      email: 'staff@example.com',
      bio: 'Sample bio for staff member',
      linkedIn: 'sample-linkedin',
      twitter: 'sample-twitter',
    },
    boardMember: {
      name: 'Sample Board Member',
      role: 'Sample Board Role',
      employer: 'Sample Employer',
    },
  },
};
