/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { Language } from './Language';

export type BackendConfig = {
    masterContractAddress?: string;
    mainnet?: boolean;
    categories?: Array<Category>;
    languages?: Array<Language>;
};

