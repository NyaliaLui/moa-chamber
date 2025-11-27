import Image from 'next/image';

const BenefitCard = ({ message, alt }: { message: string; alt: string }) => {
  return (
    <div className="w-full">
      <div className="mb-5 flex justify-center md:mb-6">
        <Image
          src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
          className="size-12"
          alt={alt}
          width={24}
          height={24}
        />
      </div>
      <h3 className="mb-3 text-center text-xl font-bold md:mb-4 md:text-2xl">
        {message}
      </h3>
    </div>
  );
};

export default BenefitCard;
