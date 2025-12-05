'use client';

import { Fragment, use } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { RxChevronLeft } from 'react-icons/rx';
import { HR } from 'flowbite-react';

import testIds from '@app/test-ids';
import { DateDisplay } from '@app/components/News/DateDisplay';
import { useWixNews } from '@app/hooks/Wix';
import { DEFAULTS, WixImage } from '@app/constants';
import LoadingState from '@app/components/LoadingState';
import ErrorState from '@app/components/ErrorState';

export default function New({ params }: any) {
  const { data: newsArticles, isLoading, error } = useWixNews();
  const { slug } = use(params) as { slug: string };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!newsArticles) {
    return <ErrorState error={new Error('news articles are undefined')} />;
  }

  let article = newsArticles.filter((item) => item.slug === slug).pop();
  if (!article) {
    article = DEFAULTS.news.article;
  }

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
              {article.readTime}min read
            </p>
          </div>
          <h1 className="text-5xl font-bold">{article.heading}</h1>
        </div>
        <div className="mx-auto mb-8 w-full overflow-hidden md:mb-12 lg:mb-8">
          <Image
            src={article.image.url}
            className="aspect-5/2 size-full object-cover"
            alt="Relume placeholder image"
            width={article.image.width}
            height={article.image.height}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-between md:flex-row">
          <div className="rb-4 mb-4 flex items-center sm:mb-8 md:mb-0">
            <div className="mr-8 md:mr-10 lg:mr-12" />
            <div className="mr-8 md:mr-10 lg:mr-12">
              <p className="mb-2">Published on</p>
              <DateDisplay dateString={article.publishDate} />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mx-auto max-w-lg">
          <div className="prose mb-12 md:prose-md lg:prose-lg md:mb-20">
            <Fragment>
              <p>{article.longDescription}</p>
              <figure>
                <Image
                  src={article.image.url}
                  alt="Relume placeholder image"
                  width={article.image.width}
                  height={article.image.height}
                />
                <figcaption>{article.caption}</figcaption>
              </figure>
            </Fragment>
          </div>
          <HR />
          <div
            className="flex items-center gap-4"
            data-testid={testIds.NEWS_DETAILS_PAGE.AUTHOR_SECTION}
          >
            <Image
              src={article.authorImage.url}
              alt={article.authorName}
              className="size-14 rounded-full object-cover"
              width={article.authorImage.width}
              height={article.authorImage.height}
            />
            <div className="grow">
              <p
                className="font-semibold md:text-md"
                data-testid={testIds.NEWS_DETAILS_PAGE.AUTHOR_NAME}
              >
                {article.authorName}
              </p>
              <p data-testid={testIds.NEWS_DETAILS_PAGE.AUTHOR_ROLE}>
                {article.authorRole}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-16 gap-8 space-y-8 md:columns-3">
        {/* Here we sort the gallery so larger images are shown first */}
        {article.gallery
          ?.sort((a, b) => b.width * b.height - a.width * a.height)
          .map((image: WixImage, i: number) => (
            <div key={i} className="block w-full">
              <Image
                src={image.url}
                alt={`gallery img-${i}`}
                className="size-full object-cover"
                width={image.width}
                height={image.height}
              />
            </div>
          ))}
      </div>
    </section>
  );
}
