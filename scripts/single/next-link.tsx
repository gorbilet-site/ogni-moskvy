import type { ComponentProps } from "react";
export default function Link({ href, prefetch: _p, ...rest }: { href: string; prefetch?: boolean } & Omit<ComponentProps<"a">, "href">) {
  void _p;
  return <a href={href} {...rest} />;
}
