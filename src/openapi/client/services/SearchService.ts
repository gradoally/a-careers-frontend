/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BackendConfig } from '../models/BackendConfig';
import type { Order } from '../models/Order';
import type { OrderActivity } from '../models/OrderActivity';
import type { OrderFindResult } from '../models/OrderFindResult';
import type { User } from '../models/User';
import type { UserFindResult } from '../models/UserFindResult';
import type { UserStat } from '../models/UserStat';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns general configuration data.
     * @returns BackendConfig Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiConfig(): CancelablePromise<BackendConfig> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/config',
        });
    }

    /**
     * Returns list of ACTIVE (available to work at) Orders that meet filter.
     * @returns Order Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiSearch({
        query,
        category,
        language,
        minPrice,
        orderBy = 'createdAt',
        sort = 'asc',
        page,
        pageSize = 10,
    }: {
        /**
         * Free query
         */
        query?: string,
        /**
         * Show only specified category.
         */
        category?: string,
        /**
         * Show only specified language.
         */
        language?: string,
        /**
         * Minimum price to include
         */
        minPrice?: number,
        /**
         * Sort field: 'createdAt' or 'deadline'.
         */
        orderBy?: string,
        /**
         * Sort order: 'asc' or 'desc'.
         */
        sort?: string,
        /**
         * Page number to return (default 0).
         */
        page?: number,
        /**
         * Page size (default 10, max 100).
         */
        pageSize?: number,
    }): CancelablePromise<Array<Order>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/search',
            query: {
                'query': query,
                'category': category,
                'language': language,
                'minPrice': minPrice,
                'orderBy': orderBy,
                'sort': sort,
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                400: `Invalid request.`,
            },
        });
    }

    /**
     * Returns number of ACTIVE (available to work at) Orders that meet filter.
     * @returns number Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiSearchcount({
        query,
        category,
        language,
        minPrice,
    }: {
        /**
         * Free query
         */
        query?: string,
        /**
         * Show only specified category.
         */
        category?: string,
        /**
         * Show only specified language.
         */
        language?: string,
        /**
         * Minimum price to include
         */
        minPrice?: number,
    }): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/searchcount',
            query: {
                'query': query,
                'category': category,
                'language': language,
                'minPrice': minPrice,
            },
        });
    }

    /**
     * Find user by wallet address.
     * @returns UserFindResult Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiFinduser({
        address,
    }: {
        /**
         * Address of user's main wallet (in user-friendly form).
         */
        address?: string,
    }): CancelablePromise<UserFindResult> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/finduser',
            query: {
                'address': address,
            },
            errors: {
                400: `Address is empty or invalid.`,
            },
        });
    }

    /**
     * Get user by index.
     * @returns User Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiGetuser({
        index,
    }: {
        /**
         * ID of user ('index' field from user contract).
         */
        index?: number,
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getuser',
            query: {
                'index': index,
            },
            errors: {
                400: `Index is invalid (or user does not exist).`,
            },
        });
    }

    /**
     * Get order by index.
     * @returns Order Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiGetorder({
        index,
    }: {
        /**
         * ID of order ('index' field from order contract).
         */
        index?: number,
    }): CancelablePromise<Order> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getorder',
            query: {
                'index': index,
            },
            errors: {
                400: `Index is invalid (or order does not exist).`,
            },
        });
    }

    /**
     * Find order by contract address.
     * @returns OrderFindResult Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiFindorder({
        address,
    }: {
        /**
         * Address of order contract (in user-friendly form).
         */
        address?: string,
    }): CancelablePromise<OrderFindResult> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/findorder',
            query: {
                'address': address,
            },
            errors: {
                400: `Address is empty or invalid.`,
            },
        });
    }

    /**
     * Get user statistics - number of orders, detailed by role (customer / freelancer) and by status.
     * Only statuses with non-zero number of orders are returned.
     * @returns UserStat Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiGetuserstats({
        index,
    }: {
        /**
         * ID of user ('index' field from user contract).
         */
        index?: number,
    }): CancelablePromise<UserStat> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getuserstats',
            query: {
                'index': index,
            },
            errors: {
                400: `Index is invalid (or user does not exist).`,
            },
        });
    }

    /**
     * Get list of user orders by role and status.
     * Only statuses with non-zero number of orders are returned.
     * @returns Order Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiGetuserorders({
        index,
        role,
        status,
    }: {
        /**
         * ID of user ('index' field from user contract).
         */
        index?: number,
        /**
         * Role of user: 'customer' or 'freelancer'.
         */
        role?: string,
        /**
         * Status of orders to return.
         */
        status?: number,
    }): CancelablePromise<Array<Order>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getuserorders',
            query: {
                'index': index,
                'role': role,
                'status': status,
            },
            errors: {
                400: `Invalid (nonexisting) 'index' or 'role' value.`,
            },
        });
    }

    /**
     * Get list of user activity in different orders.
     * @returns OrderActivity Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiGetuseractivity({
        index,
        page,
        pageSize = 10,
    }: {
        /**
         * ID of user ('index' field from user contract).
         */
        index?: number,
        /**
         * Page number to return (default 0).
         */
        page?: number,
        /**
         * Page size (default 10, max 100).
         */
        pageSize?: number,
    }): CancelablePromise<Array<OrderActivity>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getuseractivity',
            query: {
                'index': index,
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                400: `Invalid (nonexisting) 'index' value.`,
            },
        });
    }

    /**
     * Get list of order activity.
     * @returns OrderActivity Request is accepted, processed and response contains requested data.
     * @throws ApiError
     */
    public getApiGetorderactivity({
        index,
        page,
        pageSize = 10,
    }: {
        /**
         * ID of order ('index' field from user contract).
         */
        index?: number,
        /**
         * Page number to return (default 0).
         */
        page?: number,
        /**
         * Page size (default 10, max 100).
         */
        pageSize?: number,
    }): CancelablePromise<Array<OrderActivity>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getorderactivity',
            query: {
                'index': index,
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                400: `Invalid (nonexisting) 'index' value.`,
            },
        });
    }

}