import { fetchMembers } from '@app/hooks/WixServer';
import { DEFAULTS } from '@app/constants';
import MemberDetail from '@app/components/Directory/MemberDetail';

export default async function Member({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const members = await fetchMembers();

  let member = members.filter((item) => item.slug === slug).pop();
  if (!member) {
    member = DEFAULTS.project;
  }

  return <MemberDetail member={member} />;
}
