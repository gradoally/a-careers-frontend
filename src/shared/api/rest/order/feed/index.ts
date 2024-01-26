import {
  categoriesVariantFeed,
  filterToggleValue,
  languagesVarinatstFeed,
} from "@/entities/orders/config";
import { FEED_ORDERS_MOCK } from "@/shared/api";
import { setTimeoutForMock } from "@/shared/lib/developing";
import { createEffect } from "effector";

interface getFeedOrdersArgs {
  page: number;
  category: categoriesVariantFeed;
  language: languagesVarinatstFeed;
  fromPrice: string;
  orderBy: filterToggleValue;
}

export const getFeedOrders = createEffect(async (args: getFeedOrdersArgs) => {
  const {
    page,
    // category,
    // language,
    // fromPrice,
    // orderBy
  } = args;

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

export type { FeedOrder } from "./type";
