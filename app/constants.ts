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
    },
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
};
