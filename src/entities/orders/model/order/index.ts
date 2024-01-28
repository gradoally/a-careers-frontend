import { api } from "@/shared/api";
import { type Order } from "@/shared/api";
import { routes } from "@/shared/router";
import { chainRoute } from "atomic-router";
import { createStore, sample } from "effector";

export const $order = createStore<null | Order>(null);
sample({
  clock: api.orders.getOrderFx.doneData,
  target: $order,
});

export const orderLoadedRoute = chainRoute({
  route: routes.order,
  beforeOpen: {
    mapParams: ({ params }) => ({ id: params.orderId }),
    effect: api.orders.getOrderFx,
  },
});
