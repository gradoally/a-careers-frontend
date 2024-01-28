export const skeletonArray = (count: number) =>
  [].map.call("_".repeat(count), (_, key) => key) as number[];
