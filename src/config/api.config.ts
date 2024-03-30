const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
export const APIs = {
  user: {
    profile: (address: string, language: string) =>
      `${BASE_URL}/api/finduser?address=${address}&translateTo=${language}`,
    get: (index: string, language: string) =>
      `${BASE_URL}/api/getuser?index=${index}&translateTo=${language}`,
    status: (address: string,index:number) =>
      `${BASE_URL}/api/getuserstats?address=${address}&index=${index}`,
    activity: (index: string, page: number, limit: number) =>
      `${BASE_URL}/api/getuseractivity?index=${index}&page=${page}&pageSize=${limit}`,
  },
  orders: {
    get: (index: number, language: string) =>
      `${BASE_URL}/api/getorder?index=${index}&translateTo=${language}`,
    search: (query: string) => `${BASE_URL}/api/search?${query}`,
    counts: `${BASE_URL}/api/searchcount`,
  },
};
