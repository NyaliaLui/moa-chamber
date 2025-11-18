import { Fragment } from 'react';

import { getWixClient } from '@app/hooks/useWixClientServer';
import { getImageUrlForMedia } from '@app/components/Image/WixMediaImage';

import Link from 'next/link';
import Image from 'next/image';
import { RxChevronLeft } from 'react-icons/rx';
import { HR } from 'flowbite-react';

import testIds from '@app/utils/test-ids';

function DateDisplay({ dateString }: { dateString: string }) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleDateString('en-GB', options);
  };

  return <p className="font-medium">{formatDate(dateString)}</p>;
}

export default async function New({ params }: any) {
  const wixClient = await getWixClient();
  const { slug } = await params;
  const { items } = await wixClient.items.query('News').eq('slug', slug).find();
  const item = items![0];

  const authorImgSrc = getImageUrlForMedia(item.authorImage);

  return (
    <section
      className="px-[5%] mt-16"
      data-testid={testIds.NEWS_DETAILS_PAGE.CONTAINER}
    >
      <div className="container">
        <div className="rb-12 mb-6 flex flex-col items-start justify-start md:mb-9 lg:mb-10">
          <Link
            className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0 mb-8 md:mb-10 lg:mb-12"
            href="/news"
          >
            <RxChevronLeft />
            Back to posts
          </Link>
          <div className="rb-4 mb-4 flex w-full items-center justify-start">
            <p className="inline text-sm font-semibold">
              {item.readTime}min read
            </p>
          </div>
          <h1 className="text-5xl font-bold">{item.title}</h1>
        </div>
        <div className="mx-auto mb-8 w-full overflow-hidden md:mb-12 lg:mb-8">
          <Image
            src={getImageUrlForMedia(item.image)}
            className="aspect-[5/2] size-full object-cover"
            alt="Relume placeholder image"
            width={70}
            height={36}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-between md:flex-row">
          <div className="rb-4 mb-4 flex items-center sm:mb-8 md:mb-0">
            <div className="mr-8 md:mr-10 lg:mr-12" />
            <div className="mr-8 md:mr-10 lg:mr-12">
              <p className="mb-2">Published on</p>
              <DateDisplay dateString={item.publishDate} />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mx-auto max-w-lg">
          <div className="prose mb-12 md:prose-md lg:prose-lg md:mb-20">
            <Fragment>
              <p>{item.longDescription}</p>
              <figure>
                <Image
                  src={getImageUrlForMedia(item.image)}
                  alt="Relume placeholder image"
                  width={1280}
                  height={720}
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            </Fragment>
          </div>
          <HR />
          <div className="flex items-center gap-4">
            <Image
              src={authorImgSrc}
              alt={item.authorName}
              className="size-14 rounded-full object-cover"
              width={400}
              height={400}
            />
            <div className="grow">
              <p className="font-semibold md:text-md">{item.authorName}</p>
              <p>{item.authorRole}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-16 gap-8 space-y-8 md:columns-3">
        {item.gallery?.map((image: any, i: number) => (
          <div key={i} className="block w-full">
            <Image
              src={getImageUrlForMedia(image.src)}
              alt={`gallery img-${i}`}
              className="size-full object-cover"
              width={70}
              height={36}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
