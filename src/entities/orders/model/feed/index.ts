import { attach, createEvent, createStore, sample } from "effector";
import { chainRoute } from "atomic-router";
import { routes } from "@/shared/router";
import {
  $categoryFeed,
  $filterFeedfromPrice,
  $languageFeed,
  $orderBy,
  submitedFilterFeed,
  $search,
} from "..";
import { FeedOrder, api } from "@/shared/api";
import { debouncedSearch } from "../filters-feed";

export const $feedPage = createStore(0);

const getFeedArgs = {
  page: $feedPage,
  category: $categoryFeed,
  language: $languageFeed,
  fromPrice: $filterFeedfromPrice,
  orderBy: $orderBy,
  query: $search,
};

const rannedOrders = sample({
  clock: api.orders.getFeedOrders.doneData,
  filter: (feed) => feed.length === 0,
});
export const $isRanOrders = createStore(false).on(rannedOrders, () => true);

export const reachedEndOfPage = createEvent();
sample({
  clock: reachedEndOfPage,
  source: { page: $feedPage, isRanOrders: $isRanOrders },
  filter: ({ isRanOrders }) => !isRanOrders,
  fn: ({ page }) => ++page,
  target: $feedPage,
});

export const $feedOrders = createStore<FeedOrder[]>([]);

sample({
  clock: api.orders.getFeedOrders.doneData,
  filter: (feed) => feed.length > 0,
  target: $feedOrders,
});

sample({
  clock: submitedFilterFeed,
  target: routes.main.open,
});

export const getFeedOrdersFx = attach({
  effect: api.orders.getFeedOrders,
  source: getFeedArgs,
});

sample({
  clock: [$feedPage, debouncedSearch],
  target: getFeedOrdersFx,
});

export const ordersLoadedRoute = chainRoute({
  route: routes.main,
  beforeOpen: {
    effect: getFeedOrdersFx,
    mapParams: () => {},
  },
});

routes.main.open();
