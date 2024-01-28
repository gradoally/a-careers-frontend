import { PageLazyLoading } from "@/widgets/page-lazy-loading";
import { ReactNode, Suspense } from "react";

export const withSuspense = (component: () => ReactNode) => () => (
  <Suspense fallback={<PageLazyLoading />}>{component()}</Suspense>
);
