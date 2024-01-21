import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const namedLazy = <T extends Record<string, any>>(
  loader: () => Promise<T>,
  name: keyof T,
): React.LazyExoticComponent<T[keyof T]> =>
  React.lazy(async () => {
    const module = await loader();
    return { default: module[name] };
  });
