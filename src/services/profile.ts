import { get } from "@/utils/request";

import { APIs } from "@/config/api.config";

import { IUserRes } from "@/interfaces/request";

import { OrderActivity } from "@/openapi/client";

export async function getUserProfile(args: {
  address: string;
  locale: string;
}) {
  return await get<IUserRes>({
    url: `${APIs.user.profile(args.address, args.locale)}`,
  });
}

export async function getUserStatus(args: { address: string; locale: string }) {
  return await get<any>({
    url: `${APIs.user.status(args.address)}`,
  });
}

export async function getUserActivity(args: {
  index: string;
  page: number;
  pageSize: number;
}) {
  return await get<OrderActivity[]>({
    url: `${APIs.user.activity(args.index, args.page, args.pageSize)}`,
  });
}
