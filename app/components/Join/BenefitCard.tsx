import { BsMegaphone } from 'react-icons/bs';
import { FaRegHandshake } from 'react-icons/fa6';
import { LuHandHeart } from 'react-icons/lu';
import { BsCashStack } from 'react-icons/bs';

export type IconType = 'megaphone' | 'handshake' | 'heart' | 'cash';

const iconMap = {
  megaphone: BsMegaphone,
  handshake: FaRegHandshake,
  heart: LuHandHeart,
  cash: BsCashStack,
};

const BenefitCard = ({
  message,
  icon,
}: {
  message: string;
  icon: IconType;
}) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="w-full">
      <div className="mb-5 flex justify-center md:mb-6">
        <IconComponent className="size-12" />
      </div>
      <h3 className="mb-3 text-center text-lg font-bold md:mb-4 md:text-xl">
        {message}
      </h3>
    </div>
  );
};

export default BenefitCard;
