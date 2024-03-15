export interface IUser {
  index?: number;
  address?: string;
  userAddress?: string;
  revokedAt?: string | null;
  isUser?: boolean;
  isFreelancer?: boolean;
  nickname?: string | null;
  telegram?: string | null;
  about?: string | null;
  website?: string | null;
  portfolio?: string | null;
  resume?: string | null;
  specialization?: string | null;
  language?: string | null;
  aboutTranslated?: string | null;
  userStatus?: string | null;
}
