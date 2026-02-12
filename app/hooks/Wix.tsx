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
import { sanitizeText, sanitizeUrl } from '@app/sanitize';
import type { TabContent } from '@app/components/Resources/CulturalLandmarks';
import type { Business } from '@app/components/Resources/HistoricalBusinesses';
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

export interface Collections {
  team: StaffCardProps[];
  boardMembers: BoardMemberCardProps[];
  memberCards: MemberCardProps[];
  members: Project[];
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
    slug: sanitizeText(item.slug || DEFAULTS.project.slug),
  };
}

export function makeProject(item: items.WixDataItem): Project {
  return {
    _id: item._id || DEFAULTS.project._id,
    slug: sanitizeText(item.slug || DEFAULTS.project.slug),
    title: sanitizeText(item.title || DEFAULTS.project.title),
    longDescription: sanitizeText(
      item.longDescription || DEFAULTS.project.longDescription,
    ),
    email: sanitizeText(item.email || DEFAULTS.project.email),
    website: sanitizeUrl(item.website || DEFAULTS.project.website),
    phoneNumber: sanitizeText(item.phoneNumber || DEFAULTS.project.phoneNumber),
    address: sanitizeText(item.address || DEFAULTS.project.address),
    cover: item.cover ? makeWixImage(item.cover) : DEFAULTS.project.cover,
  };
}

export function makeStaffCard(item: items.WixDataItem): StaffCardProps {
  return {
    name: sanitizeText(item.name || DEFAULTS.team.staff.name),
    image: item.image ? makeWixImage(item.image) : DEFAULTS.team.staff.image,
    role: sanitizeText(item.role || DEFAULTS.team.staff.role),
    email: sanitizeText(item.email || DEFAULTS.team.staff.email),
    bio: sanitizeText(item.about || DEFAULTS.team.staff.bio),
    linkedIn: sanitizeText(item.linkedIn || DEFAULTS.team.staff.linkedIn),
    twitter: sanitizeText(item.twitter || DEFAULTS.team.staff.twitter),
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
  orderByOrderNumber = false,
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
        let query = client.items.query(collectionId);
        if (orderByOrderNumber) {
          query = query.ascending('orderNumber');
        }
        const { items: fetchedItems } = await query.find();

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
    true,
  );
}

export function useWixBoardMembers() {
  return useWixCollection(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_BOARD_MEMBERS!,
    makeBoardMemberCard,
    'board members',
    true,
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
      sanitizeUrl(
        rawData.calendarSrc
          ? rawData.calendarSrc
          : DEFAULTS.calendar.calendarSrc,
      ),
    'calendar',
  );
}

export function useWixHome() {
  return useWixSingleItem(
    process.env.NEXT_PUBLIC_WIX_COLLECTION_HOME!,
    {
      heroImage: DEFAULTS.home.hero.image,
      highlightData: DEFAULTS.home.highlight,
    },
    makeHome,
    'home',
  );
}

export interface SingleItemCollections {
  ctaImage: WixImage;
  calendar: string;
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

  const isLoading = ctaLoading || calendarLoading;
  const error = ctaError || calendarError;

  const singleItemCollections: SingleItemCollections | null =
    ctaImage && calendar
      ? {
          ctaImage,
          calendar,
        }
      : null;

  return { singleItemCollections, isLoading, error };
}
