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
  TASK = "task",
}

export const routes = {
  main: createRoute(),
  task: createRoute(),
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.TASK]: "/task",
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    {
      path: RoutePath.main,
      route: routes.main,
    },
    {
      path: RoutePath.task,
      route: routes.task,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
