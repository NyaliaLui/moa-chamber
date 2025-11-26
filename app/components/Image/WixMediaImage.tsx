import { media as wixMedia } from '@wix/sdk';
import Image, { ImageProps } from 'next/image';
import { PLACEHOLDER_IMAGE } from '@app/constants';
import type { WixClientWithItems } from '@app/hooks/useWixClientServer';

export function getImageUrlForMedia(media: string) {
  if (media.startsWith('wix:image')) {
    return wixMedia.getImageUrl(media).url;
  } else {
    return media;
  }
}

export async function getCollectionImage(
  client: WixClientWithItems,
  collectionId: string,
  defaultO: { image: string },
) {
  const { items } = await client.items.query(collectionId).limit(1).find();
  const raw = items.length > 0 ? items![0] : defaultO;
  return raw.image ? getImageUrlForMedia(raw.image) : defaultO.image;
}

export function WixMediaImage({
  media,
  height = 320,
  width = 640,
  alt = 'no info available for image',
  className,
  sizes = '10vw',
  objectFit,
  disableZoom = false,
}: {
  media?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  disableZoom?: boolean;
  objectFit?: 'cover' | 'contain';
}) {
  const imageUrl = media ? getImageUrlForMedia(media || '') : PLACEHOLDER_IMAGE;

  const styleProps: Partial<ImageProps> = {
    ...(objectFit
      ? { style: { objectFit }, fill: true, sizes }
      : { width, height }),
  };

  return (
    <div className={`flex items-center justify-center h-full`}>
      <div className="overflow-hidden relative group w-full h-full">
        <Image
          {...styleProps}
          src={imageUrl}
          alt={alt}
          className={`object-cover w-full ${
            !disableZoom ? 'group-hover:scale-110' : ''
          } transition duration-300 ease-in-out ${className}`}
        />
      </div>
    </div>
  );
}
