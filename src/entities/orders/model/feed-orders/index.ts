import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { FEED_ORDERS_MOCK, FeedOrder } from "../../config";
import { chainRoute } from "atomic-router";
import { routes } from "@/shared/config/router";
import { setTimeoutForMock } from "@/shared/lib/developing";

export const reachedEndOfPage = createEvent();

export const $feedOrders = createStore<FeedOrder[]>([]);
export const $feedPage = createStore(1);
export const $isRanOrders = createStore(false);

export const fetchOrdersFx = createEffect(async (page: number) => {
  await setTimeoutForMock();

  const count_orders = 10;
  const feed = FEED_ORDERS_MOCK.slice(
    page * count_orders - count_orders,
    page * count_orders,
  );

  if (feed.length === 0) {
    throw new Error("orders are out");
  }

  return feed;
});
export const getOrdersFx = attach({
  effect: fetchOrdersFx,
  source: $feedPage,
});

$feedOrders.on(fetchOrdersFx.doneData, (feed_orders, payload) => [
  ...feed_orders,
  ...payload,
]);

$isRanOrders.on(fetchOrdersFx.failData, () => true);

sample({
  clock: $feedPage,
  target: getOrdersFx,
});

sample({
  clock: reachedEndOfPage,
  source: $feedPage,
  fn: (count_page) => ++count_page,
  target: $feedPage,
});

export const ordersLoadedRoute = chainRoute({
  route: routes.main,
  beforeOpen: {
    effect: getOrdersFx,
    mapParams: () => {},
  },
});
// routes.main.open(); // DANGEOUR PLACE
