/** В автономной HTML-сборке этот модуль заменяется встроенными WebP. */
export const offerPhotoSrc = (slug: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/offers/${slug}.webp`;
