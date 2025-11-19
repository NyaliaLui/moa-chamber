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
