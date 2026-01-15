export interface BoardMemberCardProps {
  name: string;
  role: string;
  employer: string;
}

const BoardMemberCard = ({ name, role, employer }: BoardMemberCardProps) => {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-base lg:text-lg font-semibold text-white">{name}</h1>
      <p className="text-sm lg:text-base text-white">{role}</p>
      <p className="text-sm lg:text-base text-white">{employer}</p>
    </div>
  );
};

export default BoardMemberCard;
