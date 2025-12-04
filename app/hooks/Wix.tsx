'use client';

import { useEffect, useState } from 'react';
import {
  createClient,
  IOAuthStrategy,
  OAuthStrategy,
  WixClient,
  media as wixMedia,
} from '@wix/sdk';

import { items } from '@wix/data';
import { DEFAULT_WIX_IMAGE, DEFAULTS, WixImage } from '@app/constants';
import type { TabContent } from '@app/components/Resources/CulturalLandmarks';
import type { Business } from '@app/components/Resources/HistoricalBusinesses';
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
  image: WixImage;
  publishDate: string;
  longDescription: string;
  caption: string;
  authorImage: WixImage;
  authorName: string;
  authorRole: string;
  gallery?: WixImage[];
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

export interface Collections {
  team: StaffCardProps[];
  boardMembers: BoardMemberCardProps[];
  memberCards: MemberCardProps[];
  members: Project[];
  newsCards: NewsCardProps[];
  newsArticles: NewsArticle[];
  newsCarouselData: NewsCarouselData[];
  cultureResources: TabContent[];
  businessResources: Business[];
  benefitsData: Benefit[];
  testimonialsData: Testimonial[];
}

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
    name: item.name || DEFAULTS.resources.culture.name,
    heading: item.heading || DEFAULTS.resources.culture.heading,
    description: item.description || DEFAULTS.resources.culture.description,
    ctaLink: item.ctaLink || DEFAULTS.resources.culture.ctaLink,
    ctaLabel: item.ctaLabel || DEFAULTS.resources.culture.ctaLabel,
    image: item.image
      ? makeWixImage(item.image)
      : DEFAULTS.resources.culture.image,
  };
}

export function makeBusiness(item: items.WixDataItem): Business {
  return {
    name: item.name || DEFAULTS.resources.business.name,
    description: item.description || DEFAULTS.resources.business.description,
    website: item.website || DEFAULTS.resources.business.website,
    image: item.image
      ? makeWixImage(item.image)
      : DEFAULTS.resources.business.image,
  };
}

export function makeBenefit(item: items.WixDataItem): Benefit {
  return {
    id: item._id,
    heading: item.heading || DEFAULTS.home.benefit.heading,
    description: item.description || DEFAULTS.home.benefit.description,
    label: item.label || DEFAULTS.home.benefit.label,
    image: item.image ? makeWixImage(item.image) : DEFAULTS.home.benefit.image,
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
      ? makeWixImage(item.image)
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
    image: item.image ? makeWixImage(item.image) : DEFAULTS.home.news.image,
    authorImage: item.authorImage
      ? makeWixImage(item.authorImage)
      : DEFAULTS.home.news.authorImage,
    href: `/news/${item.slug}`,
  };
}

export function makeNewsCard(item: items.WixDataItem): NewsCardProps {
  return {
    image: item.image ? makeWixImage(item.image) : DEFAULTS.home.news.image,
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
    image: item.image ? makeWixImage(item.image) : DEFAULTS.news.article.image,
    publishDate: item.publishDate || DEFAULTS.news.article.publishDate,
    longDescription:
      item.longDescription || DEFAULTS.news.article.longDescription,
    caption: item.caption || DEFAULTS.news.article.caption,
    authorImage: item.authorImage
      ? makeWixImage(item.authorImage)
      : DEFAULTS.news.article.authorImage,
    authorName: item.authorName || DEFAULTS.news.article.authorName,
    authorRole: item.authorRole || DEFAULTS.news.article.authorRole,
    gallery: item.gallery
      ? item.gallery.map((obj: any) => makeWixImage(obj.src))
      : DEFAULTS.news.article.gallery,
  };
}

export function makeMemberCard(item: items.WixDataItem): MemberCardProps {
  return {
    media: item.cover ? makeWixImage(item.cover) : DEFAULTS.project.cover,
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
    cover: item.cover ? makeWixImage(item.cover) : DEFAULTS.project.cover,
  };
}

export function makeStaffCard(item: items.WixDataItem): StaffCardProps {
  return {
    name: item.name || DEFAULTS.team.staff.name,
    image: item.image ? makeWixImage(item.image) : DEFAULTS.team.staff.image,
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

export function useWixClient() {
  const [wixClient, setWixClient] = useState<WixClientWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initializeWixClient() {
      try {
        setIsLoading(true);
        const client: WixClientWithItems = createClient({
          modules: { items },
          auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
          }),
        });
        const tokens = await client.auth.generateVisitorTokens();
        client.auth.setTokens(tokens);

        if (isMounted) {
          setWixClient(client);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error('Failed to initialize Wix client'),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initializeWixClient();

    return () => {
      isMounted = false;
    };
  }, []);

  return { wixClient, isLoading, error };
}

// Generic hook for fetching a single Wix collection
function useWixCollection<T>(
  collectionId: string,
  mapper: (item: items.WixDataItem) => T,
  collectionName: string,
) {
  const {
    wixClient,
    isLoading: clientLoading,
    error: clientError,
  } = useWixClient();
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (clientLoading) return;
    if (clientError) {
      setError(clientError);
      setIsLoading(false);
      return;
    }
    if (!wixClient) return;

    let isMounted = true;

    async function fetchCollection(client: WixClientWithItems) {
      try {
        setIsLoading(true);
        const { items: fetchedItems } = await client.items
          .query(collectionId)
          .find();

        if (isMounted) {
          setData(fetchedItems.map(mapper));
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error(`Failed to fetch ${collectionName}`),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCollection(wixClient);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wixClient, clientLoading, clientError]);

  return { data, isLoading, error };
}

export function useWixTeam() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_TEAM!,
    makeStaffCard,
    'team',
  );
}

export function useWixBoardMembers() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_BOARD_MEMBERS!,
    makeBoardMemberCard,
    'board members',
  );
}

export function useWixMembers() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_MEMBERS!,
    makeProject,
    'members',
  );
}

export function useWixMemberCards() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_MEMBERS!,
    makeMemberCard,
    'member cards',
  );
}

export function useWixNews() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_NEWS!,
    makeNewsArticle,
    'news',
  );
}

export function useWixNewsCards() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_NEWS!,
    makeNewsCard,
    'news cards',
  );
}

export function useWixNewsCarousel() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_NEWS!,
    makeNewsCarouselData,
    'news carousel',
  );
}

export function useWixCultureResources() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_CULTURE_RESOURCES!,
    makeTabContent,
    'culture resources',
  );
}

export function useWixBusinessResources() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_BUSINESS_RESOURCES!,
    makeBusiness,
    'business resources',
  );
}

export function useWixBenefits() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_BENEFITS!,
    makeBenefit,
    'benefits',
  );
}

export function useWixTestimonials() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_TESTIMONIALS!,
    makeTestimonial,
    'testimonials',
  );
}

export function useWixCollections() {
  const { data: team, isLoading: teamLoading, error: teamError } = useWixTeam();
  const {
    data: boardMembers,
    isLoading: boardLoading,
    error: boardError,
  } = useWixBoardMembers();
  const {
    data: members,
    isLoading: membersLoading,
    error: membersError,
  } = useWixMembers();
  const {
    data: memberCards,
    isLoading: memberCardsLoading,
    error: memberCardsError,
  } = useWixMemberCards();
  const {
    data: newsArticles,
    isLoading: newsLoading,
    error: newsError,
  } = useWixNews();
  const {
    data: newsCards,
    isLoading: newsCardsLoading,
    error: newsCardsError,
  } = useWixNewsCards();
  const {
    data: newsCarouselData,
    isLoading: newsCarouselLoading,
    error: newsCarouselError,
  } = useWixNewsCarousel();
  const {
    data: cultureResources,
    isLoading: cultureLoading,
    error: cultureError,
  } = useWixCultureResources();
  const {
    data: businessResources,
    isLoading: businessLoading,
    error: businessError,
  } = useWixBusinessResources();
  const {
    data: benefitsData,
    isLoading: benefitsLoading,
    error: benefitsError,
  } = useWixBenefits();
  const {
    data: testimonialsData,
    isLoading: testimonialsLoading,
    error: testimonialsError,
  } = useWixTestimonials();

  const isLoading =
    teamLoading ||
    boardLoading ||
    membersLoading ||
    memberCardsLoading ||
    newsLoading ||
    newsCardsLoading ||
    newsCarouselLoading ||
    cultureLoading ||
    businessLoading ||
    benefitsLoading ||
    testimonialsLoading;

  const error =
    teamError ||
    boardError ||
    membersError ||
    memberCardsError ||
    newsError ||
    newsCardsError ||
    newsCarouselError ||
    cultureError ||
    businessError ||
    benefitsError ||
    testimonialsError;

  const collections: Collections | null =
    team &&
    boardMembers &&
    members &&
    memberCards &&
    newsArticles &&
    newsCards &&
    newsCarouselData &&
    cultureResources &&
    businessResources &&
    benefitsData &&
    testimonialsData
      ? {
          team,
          boardMembers,
          memberCards,
          members,
          newsCards,
          newsArticles,
          newsCarouselData,
          cultureResources,
          businessResources,
          benefitsData,
          testimonialsData,
        }
      : null;

  return { collections, isLoading, error };
}

// Generic hook for fetching a single item from a Wix collection
function useWixSingleItem<T>(
  collectionId: string,
  defaultValue: any,
  mapper: (rawData: any) => T,
  itemName: string,
) {
  const {
    wixClient,
    isLoading: clientLoading,
    error: clientError,
  } = useWixClient();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (clientLoading) return;
    if (clientError) {
      setError(clientError);
      setIsLoading(false);
      return;
    }
    if (!wixClient) return;

    let isMounted = true;

    async function fetchSingleItem(client: WixClientWithItems) {
      try {
        setIsLoading(true);
        const { items } = await client.items
          .query(collectionId)
          .limit(1)
          .find();
        const rawData = items.length > 0 ? items[0] : defaultValue;

        if (isMounted) {
          setData(mapper(rawData));
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error(`Failed to fetch ${itemName}`),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchSingleItem(wixClient);

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wixClient, clientLoading, clientError]);

  return { data, isLoading, error };
}

export function useWixCta() {
  return useWixSingleItem(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_CTA!,
    DEFAULTS.home.cta,
    (rawData) =>
      rawData.image ? makeWixImage(rawData.image) : DEFAULTS.home.cta.image,
    'CTA image',
  );
}

export function useWixCalendar() {
  return useWixSingleItem(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_CALENDAR!,
    DEFAULTS.calendar,
    (rawData) =>
      rawData.calendarSrc ? rawData.calendarSrc : DEFAULTS.calendar.calendarSrc,
    'calendar',
  );
}

export function useWixHero() {
  return useWixSingleItem(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_HERO!,
    DEFAULTS.home.hero,
    (rawData) =>
      rawData.image ? makeWixImage(rawData.image) : DEFAULTS.home.hero.image,
    'hero image',
  );
}

export interface SingleItemCollections {
  ctaImage: WixImage;
  calendar: string;
  heroImage: WixImage;
}

export function useSingleItemCollections() {
  const {
    data: ctaImage,
    isLoading: ctaLoading,
    error: ctaError,
  } = useWixCta();
  const {
    data: calendar,
    isLoading: calendarLoading,
    error: calendarError,
  } = useWixCalendar();
  const {
    data: heroImage,
    isLoading: heroLoading,
    error: heroError,
  } = useWixHero();

  const isLoading = ctaLoading || calendarLoading || heroLoading;
  const error = ctaError || calendarError || heroError;

  const singleItemCollections: SingleItemCollections | null =
    ctaImage && calendar && heroImage
      ? {
          ctaImage,
          calendar,
          heroImage,
        }
      : null;

  return { singleItemCollections, isLoading, error };
}
