import { IOAuthStrategy, WixClient, media as wixMedia } from '@wix/sdk';

import { items } from '@wix/data';
import { DEFAULT_WIX_IMAGE, DEFAULTS, WixImage } from '@app/constants';
import {
  sanitizeText,
  sanitizeUrl,
  validateEmail,
  validateHandle,
  validatePhone,
  validateSlug,
} from '@app/sanitize';
import type { TabContent } from '@app/components/Resources/CommunityTreasures';
import type { Business } from '@app/components/Resources/InfluentialBusinesses';
import type { Benefit } from '@app/components/Benefits';
import type { Testimonial } from '@app/components/Testimonials';
import type { MemberCardProps } from '@app/components/Directory/MemberCard';
import type { StaffCardProps } from '@app/components/About/StaffCard';
import type { BoardMemberCardProps } from '@app/components/About/BoardMemberCard';

export interface Highlight {
  image: WixImage;
  heading: string;
  description: string;
  website?: string;
  socialMediaHandles?: string[];
}

export interface Home {
  heroImage: WixImage;
  highlightData: Highlight;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  longDescription: string;
  email: string;
  website: string;
  phoneNumber: string;
  address: string;
  cover: WixImage;
}

export type WixClientWithItems = WixClient<
  undefined,
  IOAuthStrategy,
  {
    items: typeof items;
  }
>;

export function makeWixImage(src: string): WixImage {
  if (src.startsWith('wix:image')) {
    return wixMedia.getImageUrl(src);
  } else {
    return DEFAULT_WIX_IMAGE;
  }
}

export function makeTabContent(item: items.WixDataItem): TabContent {
  return {
    id: item._id,
    heading: sanitizeText(item.heading || DEFAULTS.resources.culture.heading),
    description: sanitizeText(
      item.description || DEFAULTS.resources.culture.description,
    ),
    ctaLink: sanitizeUrl(item.ctaLink || DEFAULTS.resources.culture.ctaLink),
    ctaLabel: sanitizeText(
      item.ctaLabel || DEFAULTS.resources.culture.ctaLabel,
    ),
    image: item.image
      ? makeWixImage(item.image)
      : DEFAULTS.resources.culture.image,
  };
}

export function makeBusiness(item: items.WixDataItem): Business {
  return {
    name: sanitizeText(item.name || DEFAULTS.resources.business.name),
    description: sanitizeText(
      item.description || DEFAULTS.resources.business.description,
    ),
    website: sanitizeUrl(item.website || DEFAULTS.resources.business.website),
    image: item.image
      ? makeWixImage(item.image)
      : DEFAULTS.resources.business.image,
  };
}

export function makeBenefit(item: items.WixDataItem): Benefit {
  return {
    id: item._id,
    heading: sanitizeText(item.heading || DEFAULTS.home.benefit.heading),
    description: sanitizeText(
      item.description || DEFAULTS.home.benefit.description,
    ),
    label: sanitizeText(item.label || DEFAULTS.home.benefit.label),
    image: item.image ? makeWixImage(item.image) : DEFAULTS.home.benefit.image,
  };
}

export function makeTestimonial(item: items.WixDataItem): Testimonial {
  return {
    id: item._id,
    quote: sanitizeText(item.quote || DEFAULTS.home.testimonial.quote),
    name: sanitizeText(item.name || DEFAULTS.home.testimonial.name),
    businessName: sanitizeText(
      item.businessName || DEFAULTS.home.testimonial.businessName,
    ),
    businessRole: sanitizeText(
      item.businessRole || DEFAULTS.home.testimonial.businessRole,
    ),
    image: item.image
      ? makeWixImage(item.image)
      : DEFAULTS.home.testimonial.image,
  };
}

export function makeHighlight(item: items.WixDataItem): Highlight {
  return {
    image: item.highlightImage
      ? makeWixImage(item.highlightImage)
      : DEFAULTS.home.highlight.image,
    heading: sanitizeText(
      item.highlightHeading || DEFAULTS.home.highlight.heading,
    ),
    description: sanitizeText(
      item.highlightDescription || DEFAULTS.home.highlight.description,
    ),
    website: sanitizeUrl(
      item.highlightWebsite || DEFAULTS.home.highlight.website || '',
    ),
    socialMediaHandles: (
      item.highlightSocialMediaHandles ||
      DEFAULTS.home.highlight.socialMediaHandles ||
      []
    ).map(sanitizeUrl),
  };
}

export function makeHome(item: items.WixDataItem): Home {
  return {
    heroImage: item.heroImage
      ? makeWixImage(item.heroImage)
      : DEFAULTS.home.hero.image,
    highlightData: makeHighlight(item),
  };
}

export function makeMemberCard(item: items.WixDataItem): MemberCardProps {
  return {
    media: item.cover ? makeWixImage(item.cover) : DEFAULTS.project.cover,
    name: sanitizeText(item.title || DEFAULTS.project.title),
    address: sanitizeText(item.address || DEFAULTS.project.address),
    slug: validateSlug(item.slug, DEFAULTS.project.slug),
  };
}

export function makeProject(item: items.WixDataItem): Project {
  return {
    _id: item._id || DEFAULTS.project._id,
    slug: validateSlug(item.slug, DEFAULTS.project.slug),
    title: sanitizeText(item.title || DEFAULTS.project.title),
    longDescription: sanitizeText(
      item.longDescription || DEFAULTS.project.longDescription,
    ),
    email: validateEmail(item.email, DEFAULTS.project.email),
    website: sanitizeUrl(item.website || DEFAULTS.project.website),
    phoneNumber: validatePhone(item.phoneNumber, DEFAULTS.project.phoneNumber),
    address: sanitizeText(item.address || DEFAULTS.project.address),
    cover: item.cover ? makeWixImage(item.cover) : DEFAULTS.project.cover,
  };
}

export function makeStaffCard(item: items.WixDataItem): StaffCardProps {
  return {
    name: sanitizeText(item.name || DEFAULTS.team.staff.name),
    image: item.image ? makeWixImage(item.image) : DEFAULTS.team.staff.image,
    role: sanitizeText(item.role || DEFAULTS.team.staff.role),
    email: validateEmail(item.email, DEFAULTS.team.staff.email),
    bio: sanitizeText(item.about || DEFAULTS.team.staff.bio),
    linkedIn: validateHandle(item.linkedIn, DEFAULTS.team.staff.linkedIn),
    twitter: validateHandle(item.twitter, DEFAULTS.team.staff.twitter),
  };
}

export function makeBoardMemberCard(
  item: items.WixDataItem,
): BoardMemberCardProps {
  return {
    name: sanitizeText(item.name || DEFAULTS.team.boardMember.name),
    role: sanitizeText(item.boardRole || DEFAULTS.team.boardMember.role),
    employer: sanitizeText(item.employer || DEFAULTS.team.boardMember.employer),
  };
}
