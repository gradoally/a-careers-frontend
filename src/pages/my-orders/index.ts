import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const MyOrdersPage = namedLazy(
  async () => await import("./ui"),
  "MyOrdersPage",
);

export const MyOrdersRoute = {
  view: MyOrdersPage,
  route: currentRoute,
};
