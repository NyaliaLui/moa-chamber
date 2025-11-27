import Image from 'next/image';

import { LOGO_IMAGE } from '@app/constants';

export const Logo = () => {
  return (
    <Image
      src={LOGO_IMAGE.light}
      alt="MOA Chamber Logo"
      width={LOGO_IMAGE.width}
      height={LOGO_IMAGE.height}
    />
  );
};
