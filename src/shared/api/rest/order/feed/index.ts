import { createEffect } from "effector";
import { transformOrderData } from "./lib";
import { queryGetFx } from "../../../wrapper";
import { getFeedOrdersArgs } from "./type";

const PATH_FEED = "/search";
export const getFeedOrders = createEffect(async (args: getFeedOrdersArgs) => {
  const page = `${args.query === "" ? args.page : 0}`;
  const queryParams = new URLSearchParams({ ...args, page });
  const request = await queryGetFx({
    path: PATH_FEED,
    queryData: queryParams,
  });

  if (!Array.isArray(request)) return [];

  const feed = request.map((order) => transformOrderData(order));

  return feed;
});

export type { FeedOrder } from "./type";
