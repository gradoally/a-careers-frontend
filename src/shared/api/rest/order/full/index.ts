import { queryGetFx } from "@/shared/api/wrapper";
import { createEffect } from "effector";
import { OrderArgs } from "./type";
import { transformOrderData } from "./lib";

const PATH = "/getorder";
export const getOrderFx = createEffect(async ({ id }: OrderArgs) => {
  const queryParams = new URLSearchParams({ index: id });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const request: any = await queryGetFx({
    path: PATH,
    queryData: queryParams,
  });

  if (request.index !== +id) return null;

  return transformOrderData(request);
});

export type { Order } from "./type";
