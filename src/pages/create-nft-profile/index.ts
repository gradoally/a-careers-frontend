import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const CreateNftProfilePage = namedLazy(
  async () => await import("./ui"),
  "CreateNftProfilePage",
);

export const CreateNftRoute = {
  view: CreateNftProfilePage,
  route: currentRoute,
};
