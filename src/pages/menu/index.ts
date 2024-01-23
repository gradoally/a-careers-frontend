import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const MenuPage = namedLazy(async () => await import("./ui"), "MenuPage");

export const MenuRoute = {
  view: MenuPage,
  route: currentRoute,
};
