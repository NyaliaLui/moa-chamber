import Image from 'next/image';

import { LOGO_IMAGE } from '@app/constants';

interface LogoProps {
  enableLightOutline: boolean;
}

export function Logo({ enableLightOutline }: LogoProps) {
  const logoSrc = enableLightOutline
    ? LOGO_IMAGE.outline.light
    : LOGO_IMAGE.outline.dark;
  return (
    <Image
      src={logoSrc}
      alt="MOA Chamber Logo"
      width={LOGO_IMAGE.width}
      height={LOGO_IMAGE.height}
      loading="eager"
    />
  );
}
