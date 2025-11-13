import Form from 'next/form';

import BenefitCard from '@app/components/Join/BenefitCard';

export default function Resources() {
  return (
    <section className="px-[5%] mt-16">
      <div className="container" data-testid="community-resources-demo">
        <div className="flex flex-col items-start">
          <div className="mx-auto mb-6 max-w-lg md:mb-9 lg:mb-10">
            <div>
              <h2 className="mb-5 text-center text-3xl font-bold md:mb-6">
                Discover community treasures
              </h2>
              <p className="text-center md:text-md">
                Explore the hidden gems and landmarks that tell the story of
                Meriden and Ozawkie. Each location offers a unique glimpse into
                our community's spirit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
