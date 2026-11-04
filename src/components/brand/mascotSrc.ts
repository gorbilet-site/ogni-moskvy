/** Путь к позе маскота. В одностраничной сборке подменяется на встроенные картинки */
export const mascotSrc = (pose: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mascot/${pose}.webp`;
