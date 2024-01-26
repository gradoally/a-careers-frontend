import { attach, createEvent, createStore, sample } from "effector";
import { FeedOrder } from "../../config";
import { chainRoute } from "atomic-router";
import { routes } from "@/shared/router";
import {
  $categoryFeed,
  $filterFeedfromPrice,
  $languageFeed,
  $orderBy,
  submitedFilterFeed,
} from "..";
import { api } from "@/shared/api";

export const reachedEndOfPage = createEvent();

export const $feedOrders = createStore<FeedOrder[]>([]);
export const $feedPage = createStore(1);
export const $isRanOrders = createStore(false);

export const getOrdersFx = attach({
  effect: api.orders.getFeedOrders,
  source: $feedPage,
});

$feedOrders.on(api.orders.getFeedOrders.doneData, (feed_orders, payload) => [
  ...feed_orders,
  ...payload,
]);

$isRanOrders.on(api.orders.getFeedOrders.failData, () => true);

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

sample({
  clock: submitedFilterFeed,
  source: {
    feedPage: $feedPage,
    categoryFeed: $categoryFeed,
    languageFeed: $languageFeed,
    filterFeedfromPrice: $filterFeedfromPrice,
    orderBy: $orderBy,
  },
  fn: (params) => {
    console.log(params);
  },
});

export const ordersLoadedRoute = chainRoute({
  route: routes.main,
  beforeOpen: {
    effect: getOrdersFx,
    mapParams: () => {},
  },
});
// routes.main.open(); // DANGEOUR PLACE
