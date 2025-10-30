import { getWixClient } from '@app/hooks/useWixClientServer';
import StaffCard from '@app/components/About/StaffCard';
import BoardMemberCard from '@app/components/About/BoardMemberCard';
import testIds from '@app/utils/test-ids';

export default async function About() {
  const wixClient = await getWixClient();
  const { items: team } = await wixClient.items.query('Our-Team').find();
  const { items: volunteers } = await wixClient.items
    .query('Volunteers')
    .find();
  return (
    <section
      className="px-[5%] mt-16"
      data-testid={testIds.TEAM_PAGE.CONTAINER}
    >
      <div className="container mx-auto max-w-lg text-center mb-16">
        <p className="mb-3 text-2xl font-semibold md:mb-4">Mission</p>
        <p className="text-lg leading-[1.4]">
          To be a member driven organization that promotes economic growth and a
          progressive community image.
        </p>
      </div>
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h1 className="rb-5 mb-5 text-3xl font-bold md:mb-6">Staff</h1>
          <p className="md:text-md">
            Dedicated professionals driving business growth in our community
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          {team!.map((item) => (
            <StaffCard
              key={item._id}
              name={item.name}
              image={item.image}
              role={item.role}
              email={item.email}
              bio={item.about}
              linkedIn={item.linkedIn}
              twitter={item.twitter}
            />
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24" />
      </div>
      <div className="container">
        <div className="mb-6 max-w-lg md:mb-9 lg:mb-10">
          <h2 className="mb-5 text-2xl font-bold md:mb-6">
            Board of Directors
          </h2>
          <p className="md:text-md">
            Business leaders who understand the pulse of our local economy
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          {volunteers!.map((item) => (
            <BoardMemberCard
              key={item._id}
              name={item.name}
              role={item.role}
              employer={item.employer}
            />
          ))}
        </div>
        <div className="mt-14 w-full max-w-md md:mt-20 lg:mt-24" />
      </div>
    </section>
  );
}
