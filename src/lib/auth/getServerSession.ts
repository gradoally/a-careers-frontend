import { LRUCache } from "lru-cache";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions, Session } from "next-auth";
import { getToken } from "next-auth/jwt";

// import logger from "@/lib/logger";
// import { safeStringify } from "@/lib/safeStringify";
// import {fetchClientGetter} from "@/openapi/client-getter";
//
// const log = logger.getSubLogger({ prefix: ["getServerSession"] });
// /**
//  * Stores the session in memory using the stringified token as the key.
//  *
//  */
// const CACHE = new LRUCache<string, Session>({ max: 1000 });
//
// /**
//  * This is a slimmed down version of the `getServerSession` function from
//  * `next-auth`.
//  *
//  * Instead of requiring the entire options object for NextAuth, we create
//  * a compatible session using information from the incoming token.
//  *
//  * The downside to this is that we won't refresh sessions if the users
//  * token has expired (30 days). This should be fine as we call `/auth/session`
//  * frequently enough on the client-side to keep the session alive.
//  */
// export async function getServerSession(options: {
//   req: NextApiRequest | GetServerSidePropsContext["req"];
//   res?: NextApiResponse | GetServerSidePropsContext["res"];
//   authOptions?: AuthOptions;
// }) {
//   log.debug("Getting server session");
//   const { req, authOptions: { secret } = {} } = options;
//
//   const token = await getToken({
//     req,
//     secret,
//   });
//
//   if (!token || !token.address) {
//     log.debug("Could not get token");
//     return null;
//   }
//
//   const cachedSession = CACHE.get(JSON.stringify(token));
//
//   if (cachedSession) {
//     return cachedSession;
//   }
//
//   const fetchClient = fetchClientGetter({next: {revalidate: false, tags: ["findUser"]}})
//   try{
//     const response = await fetchClient.search.getApiFinduser({address: token.address})
//   }catch (e) {
//
//   }
//   const userFromApi = {
//     index: "user_index"
//   }
//
//   if (!userFromApi) {
//     log.debug("No user found");
//     return null;
//   }
//
//
//   let upId = token.upId;
//
//   if (!upId) {
//     upId = `usr-${userFromApi.index}`;
//   }
//
//   if (!upId) {
//     log.error("No upId found for session", { userId: userFromApi.index });
//     return null;
//   }
//
//   const session: Session = {
//     expires: new Date(typeof token.exp === "number" ? token.exp * 1000 : Date.now()).toISOString(),
//     user: {
//       index: userFromApi.index,
//       address: userFromApi.address,
//       isUser: userFromApi.isUser,
//       isFreelancer: userFromApi.isFreelancer,
//       nickname: userFromApi.nickname,
//       telegram: userFromApi.telegram,
//       about: userFromApi.about,
//       website: userFromApi.website,
//       portfolio: userFromApi.portfolio,
//       resume: userFromApi.resume,
//       specialization: userFromApi.specialization
//     },
//     profileId: token.profileId,
//     upId,
//   };
//
//   CACHE.set(JSON.stringify(token), session);
//
//   log.debug("Returned session", safeStringify(session));
//   return session;
// }
