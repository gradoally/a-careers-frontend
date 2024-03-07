
import type { AuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { encode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
// import {WEBAPP_URL} from "@/lib/constants";
// import {defaultCookies} from "@/lib/default-cookies";
// import logger from "@/lib/logger";
// import {safeStringify} from "@/lib/safeStringify";
//
// const log = logger.getSubLogger({ prefix: ["next-auth-options"] });
//
// function isNumber(n: string) {
//     return !isNaN(parseFloat(n)) && !isNaN(+n);
// }
// export const AUTH_OPTIONS: AuthOptions = {
//     session: {
//         strategy: "jwt",
//     },
//     jwt: {
//         // decorate the native JWT encode function
//         // Impl. detail: We don't pass through as this function is called with encode/decode functions.
//         encode: async ({ token, maxAge, secret }) => {
//             if (token?.sub && isNumber(token.sub)) {
//                 const user = {
//                     index: "user_index"
//                 }
//                 // if no user is found, we still don't want to crash here.
//                 // if (user) {
//                 //     const metadata = userMetadata.parse(user.metadata);
//                 //     if (metadata?.sessionTimeout) {
//                 //         maxAge = metadata.sessionTimeout * 60;
//                 //     }
//                 // }
//             }
//             return encode({ secret, token, maxAge });
//         },
//     },
//     cookies: defaultCookies(WEBAPP_URL?.startsWith("https://")),
//     providers: [
//         CredentialsProvider({
//             id: "credentials",
//             name: "Ton connect",
//             type: "credentials",
//             credentials: {
//                 walletAddress: { label: "Ton wallet address", type: "string", placeholder: "Ton wallet address" },
//             },
//             async authorize(credentials, req) {
//                 if (!credentials) {
//                     console.error(`For some reason credentials are missing`);
//                     throw new Error("For some reason credentials are missing");
//                 }
//                 const { walletAddress } = credentials;
//
//                 // const user = await UserRepository.findByEmailAndIncludeProfilesAndPassword({
//                 //     email: credentials.email,
//                 // });
//                 // // Don't leak information about it being username or password that is invalid
//                 // if (!user) {
//                 //     throw new Error(ErrorCode.IncorrectEmailPassword);
//                 // }
//                 //
//                 // // Locked users cannot log in
//                 // if (user.locked) {
//                 //     throw new Error(ErrorCode.UserAccountLocked);
//                 // }
//                 //
//                 // await checkRateLimitAndThrowError({
//                 //     identifier: user.email,
//                 // });
//
//
//                 return {
//                     // id: user.id,
//                     // username: user.username,
//                     // email: user.email,
//                     // name: user.name,
//                     // role: validateRole(user.role),
//                     // belongsToActiveTeam: hasActiveTeams,
//                     // locale: user.locale,
//                     // profile: user.allProfiles[0],
//                 };
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({
//                       // Always available but with a little difference in value
//                       token,
//                       // Available only in case of signIn, signUp or useSession().update call.
//                       trigger,
//                       // Available when useSession().update is called. The value will be the POST data
//                       session,
//                       // Available only in the first call once the user signs in. Not available in subsequent calls
//                       user,
//                       // Available only in the first call once the user signs in. Not available in subsequent calls
//                       account,
//                   }) {
//             log.debug("callbacks:jwt", safeStringify({ token, user, account, trigger, session }));
//
//             // The data available in 'session' depends on what data was supplied in update method call of session
//             if (trigger === "update") {
//                 return {
//                     ...token,
//                     profileId: session?.profileId ?? token.profileId ?? null,
//                     upId: session?.upId ?? token.upId ?? null,
//                     locale: session?.locale ?? token.locale ?? "en",
//                     name: session?.name ?? token.name,
//                     username: session?.username ?? token.username,
//                     email: session?.email ?? token.email,
//                 } as JWT;
//             }
//             const autoMergeIdentities = async () => {
//                 const existingUser = await prisma.user.findFirst({
//                     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//                     where: { email: token.email! },
//                     select: {
//                         id: true,
//                         username: true,
//                         name: true,
//                         email: true,
//                         role: true,
//                         locale: true,
//                         movedToProfileId: true,
//                         teams: {
//                             include: {
//                                 team: true,
//                             },
//                         },
//                     },
//                 });
//
//                 if (!existingUser) {
//                     return token;
//                 }
//
//                 // Check if the existingUser has any active teams
//                 const belongsToActiveTeam = checkIfUserBelongsToActiveTeam(existingUser);
//                 const { teams: _teams, ...existingUserWithoutTeamsField } = existingUser;
//                 const allProfiles = await ProfileRepository.findAllProfilesForUserIncludingMovedUser(existingUser);
//                 log.debug(
//                     "callbacks:jwt:autoMergeIdentities",
//                     safeStringify({
//                         allProfiles,
//                     })
//                 );
//                 const { upId } = determineProfile({ profiles: allProfiles, token });
//
//                 const profile = await ProfileRepository.findByUpId(upId);
//                 if (!profile) {
//                     throw new Error("Profile not found");
//                 }
//
//                 const profileOrg = profile?.organization;
//
//                 return {
//                     ...existingUserWithoutTeamsField,
//                     ...token,
//                     profileId: profile.id,
//                     upId,
//                     belongsToActiveTeam,
//                     // All organizations in the token would be too big to store. It breaks the sessions request.
//                     // So, we just set the currently switched organization only here.
//                     org: profileOrg
//                         ? {
//                             id: profileOrg.id,
//                             name: profileOrg.name,
//                             slug: profileOrg.slug ?? profileOrg.requestedSlug ?? "",
//                             fullDomain: getOrgFullOrigin(profileOrg.slug ?? profileOrg.requestedSlug ?? ""),
//                             domainSuffix: subdomainSuffix(),
//                         }
//                         : null,
//                 } as JWT;
//             };
//             if (!user) {
//                 return await autoMergeIdentities();
//             }
//             if (!account) {
//                 return token;
//             }
//             if (account.type === "credentials") {
//                 // any other credentials, add user info
//                 return {
//                     ...token,
//                     id: user.id,
//                 } as JWT;
//             }
//
//             return token;
//         },
//         async session({ session, token, user }) {
//             log.debug("callbacks:session - Session callback called", safeStringify({ session, token, user }));
//             const profileId = token.profileId;
//             const authSession: Session = {
//                 ...session,
//                 profileId,
//                 user: {
//                     ...session.user,
//                     id: token.id as number,
//                 },
//             };
//             return authSession;
//         },
//     },
// };
//
// // /**
// //  * Identifies the profile the user should be logged into.
// //  */
// // const determineProfile = ({
// //                               token,
// //                               profiles,
// //                           }: {
// //     token: JWT;
// //     profiles: { id: number | null; upId: string }[];
// // }) => {
// //     // If profile switcher is disabled, we can only show the first profile.
// //     if (!ENABLE_PROFILE_SWITCHER) {
// //         return profiles[0];
// //     }
// //
// //     if (token.upId) {
// //         // Otherwise use what's in the token
// //         return { profileId: token.profileId, upId: token.upId as string };
// //     }
// //
// //     // If there is just one profile it has to be the one we want to log into.
// //     return profiles[0];
// // };