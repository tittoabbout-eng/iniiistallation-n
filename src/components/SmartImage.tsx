import type { ImgHTMLAttributes } from 'react'

import { getImageDimensions } from '../utils/images'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export default function SmartImage({
  src,
  alt,
  sizes,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...rest
}: Props) {
  const dimensions = getImageDimensions(src)

  return (
    <img
      src={src}
      alt={alt}
      width={width ?? dimensions.width}
      height={height ?? dimensions.height}
      sizes={sizes}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...rest}
    />
  )
}
