export interface BoardMemberCardProps {
  name: string;
  role: string;
  employer: string;
}

const BoardMemberCard = ({ name, role, employer }: BoardMemberCardProps) => {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-base md:text-lg font-semibold">{name}</h1>
      <p className="text-sm md:text-base">{role}</p>
      <p className="text-sm md:text-base">{employer}</p>
    </div>
  );
};

export default BoardMemberCard;
