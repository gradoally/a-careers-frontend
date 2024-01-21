import { namedLazy } from "@/shared/lib/lazy-load";

import { currentRoute } from "./model";

const TaskPage = namedLazy(async () => await import("./ui"), "TaskPage");

export const TaskRoute = {
  view: TaskPage,
  route: currentRoute,
};
