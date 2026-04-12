import imageDimensionsJson from '../content/image-dimensions.json'

const FALLBACK_DIMENSIONS = { width: 1600, height: 1200 }

type DimensionMap = Record<string, { width: number; height: number }>

const imageDimensions = imageDimensionsJson as DimensionMap

export function getImageDimensions(src?: string) {
  if (!src) return FALLBACK_DIMENSIONS
  return imageDimensions[src] ?? FALLBACK_DIMENSIONS
}
