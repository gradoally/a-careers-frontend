import { RouterProvider, createRoutesView } from "atomic-router-react";

import { BaseLayout } from "@/layouts/base-layout";
import { router } from "@/shared/config/router";
import { namedLazy } from "@/shared/lib/lazy-load";
import { Page } from "@/shared/config/types";

import { MainRoute } from "./main";
import { TaskRoute } from "./task";
import { FiltersOrdersRoute } from "./filters-orders";

const NotFoundPage = namedLazy(
  async () => await import("./not-found"),
  "NotFoundPage",
);

export const Pages = createRoutesView({
  routes: [MainRoute, FiltersOrdersRoute, TaskRoute],
  otherwise: NotFoundPage,
});

export const Routing = (): Page => (
  <RouterProvider router={router}>
    <BaseLayout>
      <Pages />
    </BaseLayout>
  </RouterProvider>
);
