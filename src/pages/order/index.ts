import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const OrderPage = namedLazy(async () => await import("./ui"), "OrderPage");

export const OrderRoute = {
  view: OrderPage,
  route: currentRoute,
};
