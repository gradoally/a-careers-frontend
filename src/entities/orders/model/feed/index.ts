import { attach, createEvent, createStore, sample } from "effector";
import { chainRoute } from "atomic-router";
import { routes } from "@/shared/router";
import {
  $categoryFeed,
  $filterFeedfromPrice,
  $languageFeed,
  $orderBy,
  submitedFilterFeed,
} from "..";
import { FeedOrder, api } from "@/shared/api";

export const $feedPage = createStore(1);

export const reachedEndOfPage = createEvent();
sample({
  clock: reachedEndOfPage,
  source: $feedPage,
  fn: (count_page) => ++count_page,
  target: $feedPage,
});

export const $isRanOrders = createStore(false);
$isRanOrders.on(api.orders.getFeedOrders.failData, () => true);

const getFeedArgs = {
  page: $feedPage,
  category: $categoryFeed,
  language: $languageFeed,
  fromPrice: $filterFeedfromPrice,
  orderBy: $orderBy,
};

export const $feedOrders = createStore<FeedOrder[]>([]);
$feedOrders.on(api.orders.getFeedOrders.doneData, (feed_orders, payload) => [
  ...feed_orders,
  ...payload,
]);

export const getFeedOrdersFx = attach({
  effect: api.orders.getFeedOrders,
  source: getFeedArgs,
});
sample({
  clock: $feedPage,
  target: getFeedOrdersFx,
});

sample({
  clock: submitedFilterFeed,
  source: getFeedArgs,
  target: routes.main.open,
});

export const ordersLoadedRoute = chainRoute({
  route: routes.main,
  beforeOpen: {
    effect: getFeedOrdersFx,
    mapParams: () => {},
  },
});

routes.main.open(); // DANGEOUR PLACE
