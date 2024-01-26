import { RouterProvider, createRoutesView } from "atomic-router-react";

import { router } from "@/shared/router";
import { namedLazy } from "@/shared/lib/lazy-load";
import { Page } from "@/shared/config/types";

import { MainRoute } from "./main";
import { MenuRoute } from "./menu";
import {
  FiltersFeedRoute,
  FiltersFeedCategoryRoute,
  FiltersFeedLanguageRoute,
} from "./filters-feed";
import { OrderRoute } from "./order";
import { CreateOrderRoute } from "./create-order";
import { MyOrdersRoute } from "./my-orders";

const NotFoundPage = namedLazy(
  async () => await import("./not-found"),
  "NotFoundPage",
);

export const Pages = createRoutesView({
  routes: [
    MainRoute,
    MenuRoute,
    FiltersFeedRoute,
    FiltersFeedCategoryRoute,
    FiltersFeedLanguageRoute,
    CreateOrderRoute,
    OrderRoute,
    MyOrdersRoute,
  ],
  otherwise: NotFoundPage,
});

export const Routing = (): Page => (
  <RouterProvider router={router}>
    <Pages />
  </RouterProvider>
);
