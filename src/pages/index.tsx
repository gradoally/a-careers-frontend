import { RouterProvider, createRoutesView } from "atomic-router-react";

import { BaseLayout } from "@/layouts/base-layout";
import { router } from "@/shared/config/router";
import { namedLazy } from "@/shared/lib/lazy-load";

import { MainRoute } from "./main";
import { TaskRoute } from "./task";
import { Page } from "@/shared/config/types";

const NotFoundPage = namedLazy(
  async () => await import("./not-found"),
  "NotFoundPage",
);

export const Pages = createRoutesView({
  routes: [MainRoute, TaskRoute],
  otherwise: NotFoundPage,
});

export const Routing = (): Page => (
  <RouterProvider router={router}>
    <BaseLayout>
      <Pages />
    </BaseLayout>
  </RouterProvider>
);
