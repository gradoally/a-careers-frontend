import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const MainPage = namedLazy(async () => await import("./ui"), "MainPage");

export const MainRoute = {
  view: MainPage,
  route: currentRoute,
};
