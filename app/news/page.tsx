import NewsCard from '@app/components/News/NewsCard';

import { wix } from '@app/hooks/Wix';

export default async function News() {
  const { collections } = await wix();

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
            {collections.newsCards.map((item, index) => (
              <NewsCard
                key={index}
                image={item.image}
                heading={item.heading}
                description={item.description}
                slug={item.slug}
                readTimeM={item.readTimeM}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
