const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
export const APIs = {
  user: {
    profile: (address: string, language: string) => `${BASE_URL}/api/finduser?address=${address}&translateTo=${language}`,
  },
};
