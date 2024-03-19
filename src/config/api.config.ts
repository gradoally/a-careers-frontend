const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
export const APIs = {
  user: {
    profile: (address: string, language: string) =>
      `${BASE_URL}/api/finduser?address=${address}&translateTo=${language}`,
    status: (address: string) =>
      `${BASE_URL}/api/getuserstats?address=${address}`,
    activity: (index: string, page: number, limit: number) =>
      `${BASE_URL}/api/getuseractivity?index=${index}&page=${page}&pageSize=${limit}`,
  },
  orders: {
    get: (index: string, language: string) =>
      `${BASE_URL}/api/getorder?index=${index}&translateTo=${language}`,
    search: (query: string) => `${BASE_URL}/api/search?${query}`,
    counts: `${BASE_URL}/api/searchcount`,
  },
};
