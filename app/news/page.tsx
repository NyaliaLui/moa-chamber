import NewsCard from '@app/components/News/NewsCard';

import { getWixClient } from '@app/hooks/useWixClientServer';
import { getImageUrlForMedia } from '@app/components/Image/WixMediaImage';

export default async function News() {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items.query('News').find();

  return (
    <section className="px-[5%] mt-16">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="w-full max-w-lg">
            <h1 className="mb-5 text-3xl font-bold md:mb-6">Chamber News</h1>
            <p className="md:text-md">
              Stay informed about the economic pulse and community developments
              in our local area.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16 lg:grid-cols-2">
            {items!.map((item) => (
              <NewsCard
                key={item._id}
                image={getImageUrlForMedia(item.image)}
                heading={item.title}
                description={item.shortDescription}
                slug={item.slug}
                readTimeM={item.readTime}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
