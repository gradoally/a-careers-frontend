/* eslint-disable no-unused-vars */
import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "../init";

export enum AppRoutes {
  MAIN = "main",
  FILTERS_ORDERS = "filters-orders",
  MENU = "menu",
  CREATE_ORDER = "create_order",
  MY_ORDERS = "my_orders",
  ORDER = "order",
}

export const routes = {
  main: createRoute(),
  filters_orders: createRoute(),
  menu: createRoute(),
  create_order: createRoute(),
  search_order: createRoute(),
  my_orders: createRoute(),
  order: createRoute<{ orderId: string }>(),
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.FILTERS_ORDERS]: "/filters-orders",
  [AppRoutes.MENU]: "/menu",
  [AppRoutes.CREATE_ORDER]: "/create_order",
  [AppRoutes.MY_ORDERS]: "/my_orders",
  [AppRoutes.ORDER]: "/order/:orderId",
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: RoutePath.main,
      route: routes.main,
    },
    {
      path: RoutePath["filters-orders"],
      route: routes.filters_orders,
    },
    {
      path: RoutePath.menu,
      route: routes.menu,
    },
    {
      path: RoutePath.create_order,
      route: routes.create_order,
    },
    {
      path: RoutePath.my_orders,
      route: routes.my_orders,
    },
    {
      path: RoutePath.order,
      route: routes.order,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});

export { LINK_TELEGRAM_SUPPORT } from "./external-link";
