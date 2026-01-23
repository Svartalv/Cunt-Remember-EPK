// Main images configuration export
// Import and re-export all image configurations

export * from './gallery'
export * from './home'
export * from './bio'
export * from './music'
export * from './mixes'
export * from './events'

// Combined images object
import { galleryImages } from './gallery'
import { homeImages } from './home'
import { bioImages } from './bio'
import { musicImages } from './music'
import { mixesImages } from './mixes'
import { eventsImages } from './events'

export const images = {
  home: homeImages,
  bio: bioImages,
  music: musicImages,
  mixes: mixesImages,
  events: eventsImages,
  gallery: galleryImages,
}

// Helper function to get image path with fallback
export const getImagePath = (path: string, fallback?: string): string => {
  return path || fallback || '/images/placeholder.jpg'
}
