'use client';

import React, { useRef, useState } from 'react';
import { Button } from 'flowbite-react';
import {
  NewsCarouselCard,
  NewsCarouselCardProps,
} from '@app/components/News/NewsCarouselCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import testIds from '@app/test-ids';

export interface NewsCarouselData extends NewsCarouselCardProps {
  id: string;
}

interface NewsCarouselProps {
  newsArticles: NewsCarouselData[];
}

const NewsCarousel = ({ newsArticles }: NewsCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Chamber News
          </h2>
          <Button
            color="dark"
            size="lg"
            outline
            href="/news"
            className="hidden md:flex hover:text-white! border-gray-600!"
          >
            View all
          </Button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide mb-6"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {newsArticles.map((article, index) => (
            <div
              key={article.id}
              className="flex-none w-[85%] sm:w-[70%] md:w-[45%] lg:w-[30%]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <NewsCarouselCard {...article} />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {newsArticles.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  hoveredIndex === index ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                data-testid={testIds.HOME_PAGE.NEWS_CAROUSEL_DOTS}
              />
            ))}
          </div>
          {/* The News Carousel Arrows are built-in buttons instead of Flowbite for more control over the style. */}
          <div
            className="flex gap-2"
            data-testid={testIds.HOME_PAGE.NEWS_CAROUSEL_ARROWS}
          >
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-lg bg-gray-300 hover:bg-gray-600 transition-colors"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-lg bg-gray-300 hover:bg-gray-600 transition-colors"
              aria-label="Scroll right"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 md:hidden flex justify-center">
          <Button
            color="dark"
            size="lg"
            className="hover:text-white!"
            outline
            href="/news"
          >
            View all
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewsCarousel;
