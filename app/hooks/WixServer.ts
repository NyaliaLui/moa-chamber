import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { DEFAULTS } from '@app/constants';
import { sanitizeUrl } from '@app/sanitize';
import type { WixClientWithItems } from '@app/hooks/Wix';
import {
  makeBenefit,
  makeBoardMemberCard,
  makeBusiness,
  makeHome,
  makeMemberCard,
  makeProject,
  makeStaffCard,
  makeTabContent,
  makeTestimonial,
  makeWixImage,
} from '@app/hooks/Wix';

export type { Highlight, Home, Project } from '@app/hooks/Wix';

async function getWixClient(): Promise<WixClientWithItems> {
  const client: WixClientWithItems = createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });
  const tokens = await client.auth.generateVisitorTokens();
  client.auth.setTokens(tokens);
  return client;
}

async function fetchWixCollection<T>(
  collectionId: string,
  mapper: (item: items.WixDataItem) => T,
  orderByOrderNumber = false,
): Promise<T[]> {
  const client = await getWixClient();
  let query = client.items.query(collectionId);
  if (orderByOrderNumber) {
    query = query.ascending('orderNumber');
  }
  const { items: fetchedItems } = await query.find();
  return fetchedItems.map(mapper);
}

async function fetchWixSingleItem<T>(
  collectionId: string,
  defaultValue: items.WixDataItem,
  mapper: (rawData: items.WixDataItem) => T,
): Promise<T> {
  const client = await getWixClient();
  const { items: fetchedItems } = await client.items
    .query(collectionId)
    .limit(1)
    .find();
  const rawData = fetchedItems.length > 0 ? fetchedItems[0] : defaultValue;
  return mapper(rawData);
}

export async function fetchTeam() {
  return fetchWixCollection(
    process.env.WIX_COLLECTION_TEAM!,
    makeStaffCard,
    true,
  );
}

export async function fetchBoardMembers() {
  return fetchWixCollection(
    process.env.WIX_COLLECTION_BOARD_MEMBERS!,
    makeBoardMemberCard,
    true,
  );
}

export async function fetchMembers() {
  return fetchWixCollection(process.env.WIX_COLLECTION_MEMBERS!, makeProject);
}

export async function fetchMemberCards() {
  return fetchWixCollection(
    process.env.WIX_COLLECTION_MEMBERS!,
    makeMemberCard,
  );
}

export async function fetchCultureResources() {
  return fetchWixCollection(
    process.env.WIX_COLLECTION_CULTURE_RESOURCES!,
    makeTabContent,
  );
}

export async function fetchBusinessResources() {
  return fetchWixCollection(
    process.env.WIX_COLLECTION_BUSINESS_RESOURCES!,
    makeBusiness,
  );
}

export async function fetchBenefits() {
  return fetchWixCollection(process.env.WIX_COLLECTION_BENEFITS!, makeBenefit);
}

export async function fetchTestimonials() {
  return fetchWixCollection(
    process.env.WIX_COLLECTION_TESTIMONIALS!,
    makeTestimonial,
  );
}

export async function fetchCtaImage() {
  return fetchWixSingleItem(
    process.env.WIX_COLLECTION_CTA!,
    DEFAULTS.home.cta as unknown as items.WixDataItem,
    (rawData) =>
      rawData.image ? makeWixImage(rawData.image) : DEFAULTS.home.cta.image,
  );
}

export async function fetchCalendar() {
  return fetchWixSingleItem(
    process.env.WIX_COLLECTION_CALENDAR!,
    DEFAULTS.calendar as unknown as items.WixDataItem,
    (rawData) =>
      sanitizeUrl(
        rawData.calendarSrc
          ? rawData.calendarSrc
          : DEFAULTS.calendar.calendarSrc,
      ),
  );
}

export async function fetchHome() {
  return fetchWixSingleItem(
    process.env.WIX_COLLECTION_HOME!,
    {
      heroImage: DEFAULTS.home.hero.image,
      highlightData: DEFAULTS.home.highlight,
    } as unknown as items.WixDataItem,
    makeHome,
  );
}
