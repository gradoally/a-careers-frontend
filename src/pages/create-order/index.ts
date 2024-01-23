import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const CreateOrderPage = namedLazy(
  async () => await import("./ui"),
  "CreateOrderPage",
);

export const CreateOrderRoute = {
  view: CreateOrderPage,
  route: currentRoute,
};
