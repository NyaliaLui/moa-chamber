import { getWixClient } from '@app/hooks/useWixClientServer';
import {
  getImageUrlForMedia,
  getCollectionImage,
} from '@app/components/Image/WixMediaImage';

import Hero from '@app/components/Hero';
import NewsCarousel, { NewsArticle } from '@app/components/NewsCarousel';
import Benefits, { Benefit } from '@app/components/Benefits';
import Testimonials, { Testimonial } from '@app/components/Testimonials';
import { DEFAULTS } from '@app/constants';
import CTA from '@app/components/CTA';

export default async function Home() {
  const wixClient = await getWixClient();
  const heroImage = await getCollectionImage(
    wixClient,
    'TestHero',
    DEFAULTS.home.hero,
  );
  const { items: benefitsRaw } = await wixClient.items
    .query('TestBenefits')
    .find();
  const { items: testimonialsRaw } = await wixClient.items
    .query('TestTestimonials')
    .find();
  const ctaImage = await getCollectionImage(
    wixClient,
    'TestCTA',
    DEFAULTS.home.cta,
  );
  const { items: newsRaw } = await wixClient.items.query('News').find();

  const benefitsData: Benefit[] = benefitsRaw.map((item) => ({
    id: item._id,
    heading: item?.heading || DEFAULTS.home.benefit.heading,
    description: item?.description || DEFAULTS.home.benefit.description,
    label: item?.label || DEFAULTS.home.benefit.label,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.home.benefit.image,
  }));

  const testimonialsData: Testimonial[] = testimonialsRaw.map((item) => ({
    id: item._id,
    quote: item?.quote || DEFAULTS.home.testimonial.quote,
    name: item?.name || DEFAULTS.home.testimonial.name,
    businessName: item?.businessName || DEFAULTS.home.testimonial.businessName,
    businessRole: item?.businessRole || DEFAULTS.home.testimonial.businessRole,
    image: item.image
      ? getImageUrlForMedia(item.image)
      : DEFAULTS.home.testimonial.image,
  }));

  const newsData: NewsArticle[] = newsRaw.map((item) => ({
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
  }));

  return (
    <div className="mx-auto relative sm:px-20 py-2.5">
      <Hero image={heroImage} />
      <NewsCarousel newsArticles={newsData} />
      <Benefits benefitsData={benefitsData} />
      <Testimonials testimonialsData={testimonialsData} />
      <CTA image={ctaImage} />
    </div>
  );
}
