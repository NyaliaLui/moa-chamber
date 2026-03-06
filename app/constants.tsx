export const WIX_ACCESS_TOKEN = 'wix_accessToken';
export const WIX_REFRESH_TOKEN = 'wix_refreshToken';

export const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';
export const CLOUDFRONT_PLACEHOLDER_IMAGE =
  'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg';

export interface WixImage {
  id: string;
  url: string;
  height: number;
  width: number;
  altText?: string | undefined;
  filename?: string | undefined;
}

export const LOGO_IMAGE = {
  outline: {
    light: '/images/MOA-Logo.svg',
    dark: '/images/MOA-Logo.svg',
  },
  width: 240,
  height: 135,
};

export const ICO_IMAGE = {
  outline: {
    light: '/images/MOA-Logo.ico',
    dark: '/images/MOA-Logo.ico',
  },
  width: 32,
  height: 32,
};

export const SOCIAL_MEDIA_URLS = {
  linkedIn: 'https://www.linkedin.com/in/',
  twitter: 'https://x.com/',
};

export const WIX_IMAGE_PREFIX = 'wix:image://v1';

export const IMAGE_DIMENSIONS = {
  placeholder: {
    width: 70,
    height: 36,
  },
  staffCard: {
    width: 256,
    height: 128,
  },
};

export const NAVBAR_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/directory', label: 'Our Members' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/resources', label: 'Community Resources' },
  { href: '/about', label: 'About Us' },
];

export const PAYPAL_URL = 'https://www.paypal.com/ncp/payment/7TMP7X7UP7TLS';

export const DEFAULT_WIX_IMAGE: WixImage = {
  id: '',
  url: PLACEHOLDER_IMAGE,
  height: -1,
  width: -1,
};

export const DEFAULTS = {
  home: {
    hero: {
      image: DEFAULT_WIX_IMAGE,
    },
    highlight: {
      image: DEFAULT_WIX_IMAGE,
      heading: 'The Daily Grind',
      description:
        'Welcome to our newest chamber member! The Daily Grind brings artisanal coffee roasting expertise to our community, offering premium locally-roasted beans and a warm gathering space for coffee enthusiasts.',
      website: undefined,
      socialMediaHandles: [],
    },
    benefit: {
      heading: 'Sample Heading',
      description: 'Sample description',
      label: 'Sample',
      image: DEFAULT_WIX_IMAGE,
    },
    testimonial: {
      quote: 'Sample testimonial quote',
      name: 'Sample Name',
      businessName: 'Sample Business',
      businessRole: 'Sample Role',
      image: DEFAULT_WIX_IMAGE,
    },
    cta: {
      image: DEFAULT_WIX_IMAGE,
    },
  },
  calendar: {
    calendarSrc: '',
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
    cover: DEFAULT_WIX_IMAGE,
  },
  resources: {
    culture: {
      heading: 'Sample heading',
      description: 'Sample description',
      ctaLink: '',
      ctaLabel: 'CTA',
      image: DEFAULT_WIX_IMAGE,
    },
    business: {
      name: 'Sample Business',
      description: 'Sample description',
      website: '',
      image: DEFAULT_WIX_IMAGE,
    },
  },
  team: {
    staff: {
      name: 'Sample Staff Name',
      image: DEFAULT_WIX_IMAGE,
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

export const DEFAULT_TARGET_EMAIL = 'luinyalia@gmail.com';

export const DEFAULT_TESTIMONIAL_STARS = 5;
