import { FEED_ORDERS_MOCK } from "@/entities/orders/config";
import { setTimeoutForMock } from "@/shared/lib/developing";
import { createEffect } from "effector";

export const getFeedOrders = createEffect(async (page: number) => {
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
