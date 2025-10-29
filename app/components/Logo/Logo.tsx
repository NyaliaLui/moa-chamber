import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
      alt="MOA Chamber Logo"
      width={70}
      height={36}
    />
  );
};
