import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const ProfilePage = namedLazy(async () => await import("./ui"), "ProfilePage");

export const ProfileRoute = {
  view: ProfilePage,
  route: currentRoute,
};
