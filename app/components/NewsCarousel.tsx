import React from 'react';
import { Button, Carousel } from 'flowbite-react';

import { getWixClient } from '@app/hooks/useWixClientServer';
import { getImageUrlForMedia } from '@app/components/Image/WixMediaImage';
import NewsCarouselCard from '@app/components/Carousel/NewsCarouselCard';

const NewsCarousel = async () => {
  const wixClient = await getWixClient();
  const { items } = await wixClient.items.query('News').find();

  return (
    <section className="px-[5%] mt-16" data-testid="news-carousel">
      <div className="container">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Chamber News
          </h2>
          <Button color="dark" size="sm" outline href="/news">
            View all
          </Button>
        </div>
        <Carousel pauseOnHover className="h-56 sm:h-64 xl:h-80 2xl:h-[40rem]">
          {items!.map((item) => (
            <NewsCarouselCard
              key={item._id}
              image={getImageUrlForMedia(item.image, 100, 200)}
              heading={item.title}
              description={item.shortDescription}
              href={`/news/${item.slug}`}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default NewsCarousel;
