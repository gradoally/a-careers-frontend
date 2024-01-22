import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const FiltersOrdersPage = namedLazy(
  async () => await import("./ui"),
  "FiltersOrdersPage",
);

export const FiltersOrdersRoute = {
  view: FiltersOrdersPage,
  route: currentRoute,
};
