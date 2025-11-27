import {
  createClient,
  IOAuthStrategy,
  OAuthStrategy,
  WixClient,
  media as wixMedia,
} from '@wix/sdk';

import { items } from '@wix/data';
import { DEFAULTS } from '@app/constants';
import type { TabContent } from '@app/components/Resources/CultureBoxTabs';
import type { Business } from '@app/components/Resources/BusinessBox';
import type { Benefit } from '@app/components/Benefits';
import type { Testimonial } from '@app/components/Testimonials';
import { NewsCarouselData } from '@app/components/NewsCarousel';
import type { NewsCardProps } from '@app/components/News/NewsCard';
import type { MemberCardProps } from '@app/components/Directory/MemberCard';
import type { StaffCardProps } from '@app/components/About/StaffCard';
import type { BoardMemberCardProps } from '@app/components/About/BoardMemberCard';

export interface NewsArticle {
  slug: string;
  readTime: number;
  heading: string;
  image: string;
  publishDate: string;
  longDescription: string;
  caption: string;
  authorImage: string;
  authorName: string;
  authorRole: string;
  gallery?: Array<{ src: string }>;
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
}

export type WixClientWithItems = WixClient<
  undefined,
  IOAuthStrategy,
  {
    items: typeof items;
  }
>;

export interface Collections {
  team: StaffCardProps[];
  volunteers: BoardMemberCardProps[];
  memberCards: MemberCardProps[];
  projects: Project[];
  newsCards: NewsCardProps[];
  newsArticles: NewsArticle[];
  newsCarouselData: NewsCarouselData[];
  cultureResources: TabContent[];
  businessResources: Business[];
  benefitsData: Benefit[];
  testimonialsData: Testimonial[];
}

export function getImageUrlForMedia(media: string) {
  if (media.startsWith('wix:image')) {
    return wixMedia.getImageUrl(media).url;
  } else {
    return media;
  }
}

export function makeTabContent(item: items.WixDataItem): TabContent {
  return {
    id: item._id,
    name: item.name || DEFAULTS.resources.culture.name,
    heading: item.heading || DEFAULTS.resources.culture.heading,
    description: item.description || DEFAULTS.resources.culture.description,
    ctaLink: item.ctaLink || DEFAULTS.resources.culture.ctaLink,
    ctaLabel: item.ctaLabel || DEFAULTS.resources.culture.ctaLabel,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.resources.culture.image,
  };
}

export function makeBusiness(item: items.WixDataItem): Business {
  return {
    name: item.name || DEFAULTS.resources.business.name,
    description: item.description || DEFAULTS.resources.business.description,
    website: item.website || DEFAULTS.resources.business.website,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.resources.business.image,
  };
}

export function makeBenefit(item: items.WixDataItem): Benefit {
  return {
    id: item._id,
    heading: item.heading || DEFAULTS.home.benefit.heading,
    description: item.description || DEFAULTS.home.benefit.description,
    label: item.label || DEFAULTS.home.benefit.label,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.home.benefit.image,
  };
}

export function makeTestimonial(item: items.WixDataItem): Testimonial {
  return {
    id: item._id,
    quote: item.quote || DEFAULTS.home.testimonial.quote,
    name: item.name || DEFAULTS.home.testimonial.name,
    businessName: item.businessName || DEFAULTS.home.testimonial.businessName,
    businessRole: item.businessRole || DEFAULTS.home.testimonial.businessRole,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.home.testimonial.image,
  };
}

export function makeNewsCarouselData(
  item: items.WixDataItem,
): NewsCarouselData {
  return {
    id: item._id,
    heading: item?.heading || DEFAULTS.home.news.heading,
    subHeading: item?.subHeading || DEFAULTS.home.news.subHeading,
    authorName: item?.authorName || DEFAULTS.home.news.authorName,
    publishDate: item?.publishDate || DEFAULTS.home.news.publishDate,
    readTime: item?.readTime || DEFAULTS.home.news.readTime,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.home.news.image,
    authorImage: item.authorImage
      ? getImageUrlForMedia(item.authorImage)
      : DEFAULTS.home.news.authorImage,
    href: `/news/${item.slug}`,
  };
}

export function makeNewsCard(item: items.WixDataItem): NewsCardProps {
  return {
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.home.news.image,
    heading: item.heading || DEFAULTS.home.news.heading,
    description: item.description || DEFAULTS.home.news.subHeading,
    slug: item.slug || DEFAULTS.home.news.slug,
    readTimeM: item.readTime || DEFAULTS.home.news.readTime,
  };
}

export function makeNewsArticle(item: items.WixDataItem): NewsArticle {
  return {
    slug: item.slug || DEFAULTS.news.article.slug,
    readTime: item.readTime || DEFAULTS.news.article.readTime,
    heading: item.heading || DEFAULTS.news.article.heading,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.news.article.image,
    publishDate: item.publishDate || DEFAULTS.news.article.publishDate,
    longDescription:
      item.longDescription || DEFAULTS.news.article.longDescription,
    caption: item.caption || DEFAULTS.news.article.caption,
    authorImage: item.authorImage
      ? getImageUrlForMedia(item.authorImage)
      : DEFAULTS.news.article.authorImage,
    authorName: item.authorName || DEFAULTS.news.article.authorName,
    authorRole: item.authorRole || DEFAULTS.news.article.authorRole,
    gallery: item.gallery || DEFAULTS.news.article.gallery,
  };
}

export function makeMemberCard(item: items.WixDataItem): MemberCardProps {
  return {
    media: item.cover || DEFAULTS.project._id,
    name: item.title || DEFAULTS.project.title,
    address: item.address || DEFAULTS.project.address,
    slug: item.slug || DEFAULTS.project.slug,
  };
}

export function makeProject(item: items.WixDataItem): Project {
  return {
    _id: item._id || DEFAULTS.project._id,
    slug: item.slug || DEFAULTS.project.slug,
    title: item.title || DEFAULTS.project.title,
    longDescription: item.longDescription || DEFAULTS.project.longDescription,
    email: item.email || DEFAULTS.project.email,
    website: item.website || DEFAULTS.project.website,
    phoneNumber: item.phoneNumber || DEFAULTS.project.phoneNumber,
    address: item.address || DEFAULTS.project.address,
  };
}

export function makeStaffCard(item: items.WixDataItem): StaffCardProps {
  return {
    name: item.name || DEFAULTS.team.staff.name,
    image: item.image || DEFAULTS.team.staff.image,
    role: item.role || DEFAULTS.team.staff.role,
    email: item.email || DEFAULTS.team.staff.email,
    bio: item.about || DEFAULTS.team.staff.bio,
    linkedIn: item.linkedIn || DEFAULTS.team.staff.linkedIn,
    twitter: item.twitter || DEFAULTS.team.staff.twitter,
  };
}

export function makeBoardMemberCard(
  item: items.WixDataItem,
): BoardMemberCardProps {
  return {
    name: item.name || DEFAULTS.team.boardMember.name,
    role: item.role || DEFAULTS.team.boardMember.role,
    employer: item.employer || DEFAULTS.team.boardMember.employer,
  };
}

export async function getWixClient() {
  const wixClient: WixClientWithItems = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  wixClient.auth.setTokens(tokens);
  return wixClient;
}

export async function getWixCollections(): Promise<Collections> {
  const wixClient = await getWixClient();
  const { items: team } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_TEAM!)
    .find();
  const { items: volunteers } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_VOLUNTEERS!)
    .find();
  const { items: projects } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_PROJECTS!)
    .find();
  const { items: news } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_NEWS!)
    .find();
  const { items: cultureResources } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_CULTURE_RESOURCES!)
    .find();
  const { items: businessResources } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_BUSINESS_RESOURCES!)
    .find();
  const { items: benefitsData } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_BENEFITS!)
    .find();
  const { items: testimonialsData } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_TESTIMONIALS!)
    .find();

  // Validation happens in the map handlers

  return {
    team: team.map(makeStaffCard),
    volunteers: volunteers.map(makeBoardMemberCard),
    memberCards: projects.map(makeMemberCard),
    projects: projects.map(makeProject),
    newsCards: news.map(makeNewsCard),
    newsArticles: news.map(makeNewsArticle),
    newsCarouselData: news.map(makeNewsCarouselData),
    cultureResources: cultureResources.map(makeTabContent),
    businessResources: businessResources.map(makeBusiness),
    benefitsData: benefitsData.map(makeBenefit),
    testimonialsData: testimonialsData.map(makeTestimonial),
  };
}

export interface SingleItemCollections {
  ctaImage: string;
  calendar: string;
  heroImage: string;
}

export async function getSingleItemCollections(): Promise<SingleItemCollections> {
  const wixClient = await getWixClient();

  const { items: ctaItems } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_CTA!)
    .limit(1)
    .find();
  const ctaRaw = ctaItems.length > 0 ? ctaItems[0] : DEFAULTS.home.cta;

  const { items: calendarItems } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_CALENDAR!)
    .limit(1)
    .find();
  const calendarRaw =
    calendarItems.length > 0 ? calendarItems[0] : DEFAULTS.calendar;

  const { items: heroItems } = await wixClient.items
    .query(process.env.NEXT_PUBLIC_WIX_COLLECTION_HERO!)
    .limit(1)
    .find();
  const heroRaw = heroItems.length > 0 ? heroItems[0] : DEFAULTS.home.hero;

  return {
    ctaImage: ctaRaw.image
      ? getImageUrlForMedia(ctaRaw.image)
      : DEFAULTS.home.cta.image,
    calendar: calendarRaw.calendarSrc
      ? calendarRaw.calendarSrc
      : DEFAULTS.calendar.calendarSrc,
    heroImage: heroRaw.image
      ? getImageUrlForMedia(heroRaw.image)
      : DEFAULTS.home.hero.image,
  };
}

export interface WixData {
  collections: Collections;
  singleItemCollections: SingleItemCollections;
}

export async function wix(): Promise<WixData> {
  const collections = await getWixCollections();
  const singleItemCollections = await getSingleItemCollections();
  return {
    collections: collections,
    singleItemCollections: singleItemCollections,
  };
}
