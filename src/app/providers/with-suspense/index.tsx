import { ReactNode, Suspense } from "react";

export const withSuspense = (component: () => ReactNode) => () => (
  <Suspense fallback="">{component()}</Suspense>
);
