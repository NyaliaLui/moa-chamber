const BoardMemberCard = ({
  name,
  role,
  employer,
}: {
  name: string;
  role: string;
  employer: string;
}) => {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-lg font-semibold md:text-lg">{name}</h1>
      <p className="text-lg">{role}</p>
      <p className="text-md">{employer}</p>
    </div>
  );
};

export default BoardMemberCard;
