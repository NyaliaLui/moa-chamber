import ReactPlayer from 'react-player';

import { BiEnvelope, BiMap, BiMessageDetail, BiPhone } from 'react-icons/bi';
import Link from 'next/link';
import { getWixClient } from '@app/hooks/useWixClientServer';
import testIds from '@app/utils/test-ids';

export default async function Project({ params }: any) {
  const wixClient = await getWixClient();
  // Dynamic APIs such as params must be awaited.
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { slug } = await params;
  const { items } = await wixClient.items
    .query('Our-Projects')
    .eq('slug', slug)
    .find();
  const project = items![0];

  return (
    <section
      className="px-[5%] mt-16"
      data-testid={testIds.PROJECT_DETAILS_PAGE.CONTAINER}
    >
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <ReactPlayer
            key={project._id}
            src="https://www.youtube.com/watch?v=qsOUv9EzKsg"
            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
          />
        </div>
        <div className="mx-auto max-w-lg">
          <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-6xl">
            {project.title}
          </h1>
          <div className="prose">
            <p>{project.longDescription}</p>
          </div>
        </div>
        <div className="py-16 md:py-24 lg:py-28 grid auto-cols-fr gap-x-8 gap-y-12 sm:gap-x-8 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiEnvelope className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Email
            </h3>
            {project.email}
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiMessageDetail className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Website
            </h3>
            <Link className="underline" href={project.website}>
              {project.website}
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiPhone className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Phone
            </h3>
            {project.phoneNumber}
          </div>
          <div className="flex flex-col items-center justify-start text-center">
            <div className="mb-5 sm:mb-6">
              <BiMap className="size-12" />
            </div>
            <h3 className="mb-3 text-2xl font-bold leading-[1.4] sm:mb-4 md:text-3xl lg:mb-4 lg:text-4xl">
              Address
            </h3>
            {project.address}
          </div>
        </div>
      </div>
    </section>
  );
}
