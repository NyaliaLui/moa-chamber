import Image from 'next/image';

import { LOGO_IMAGE } from '@app/constants';

export const Logo = () => {
  return (
    <Image
      src={LOGO_IMAGE.light}
      alt="MOA Chamber Logo"
      width={28}
      height={32}
    />
  );
};
