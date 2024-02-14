/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    index?: number;
    /**
     * Smartcontract address - in bounceable form.
     */
    address?: string;
    /**
     * User wallet address - in non-bounceable form.
     */
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
};

