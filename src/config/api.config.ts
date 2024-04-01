import { IOrderArgs } from "@/interfaces/serviceArgs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
export const APIs = {
  user: {
    profile: (address: string, language: string) =>
      `${BASE_URL}/api/finduser?address=${address}&translateTo=${language}`,
    get: (index: string, language: string) =>
      `${BASE_URL}/api/getuser?index=${index}&translateTo=${language}`,
    status: (address: string, index: number) =>
      `${BASE_URL}/api/getuserstats?address=${address}&index=${index}`,
    activity: (index: string, page: number, limit: number) =>
      `${BASE_URL}/api/getuseractivity?index=${index}&page=${page}&pageSize=${limit}`,
  },
  orders: {
    get: (query: IOrderArgs) =>
      `${BASE_URL}/api/getorder?index=${query.index}&translateTo=${query.translateTo}&${query?.currentUserIndex === undefined || query.currentUserIndex < 0 ? "":`currentUserIndex=${query.currentUserIndex}`}`,
    search: (query: string) => `${BASE_URL}/api/search?${query}`,
    counts: `${BASE_URL}/api/searchcount`,
  },
  config: {
    get: `${BASE_URL}/api/config`,
  },
};
