import { get } from "@/utils/request";

import { APIs } from "@/config/api.config";

import { Order } from "@/openapi/client";

export async function getOrders(query: string) {
  return await get<Order[]>({
    url: APIs.orders.search(query),
  });
}

export async function getOrder(args: { index: string; locale: string }) {
  return await get<Order>({
    url: `${APIs.orders.get(args.index, args.locale)}`,
  });
}

export async function getOrdersCount() {
  return await get<number>({
    url: APIs.orders.counts,
  });
}
