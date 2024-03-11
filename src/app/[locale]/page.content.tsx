"use client"

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWRInfinite from 'swr/infinite';

import Stack from "@mui/material/Stack";

import InfiniteScroll from "@/components/InfiniteScroll";
import TaskList from "@/components/TaskList";
import TaskListSkeleton from "@/components/TaskListSkeleton";
import Divider from "@/components/ui/Divider";

import { APIs } from "@/config/api.config";
import { fetcher } from "@/lib/swr";
import { Order } from "@/openapi/client";
import { get } from "@/services/request";

const Content = () => {
    const searchParams = useSearchParams();

    const [pageLimit, setPageLimit] = useState(0);

    const getKey = (pageIndex: number, previousPageData: Order[]) => {
        // Use the previous page data to determine if this is the last page.
        if (previousPageData && !previousPageData.length) return null;
        const params = new URLSearchParams(searchParams)
        params.set("page", (pageIndex).toString());
        // Index starts from 0
        const query = `${params.toString()}&orderBy=createdAt`;
        return APIs.orders.search(query);
    };

    const {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
        mutate,
    } = useSWRInfinite<Order[]>(getKey, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateFirstPage: false,
        revalidateAll: false,
    });

    const isLoadingInitialData = !data && !error;
    const isRefreshing = isValidating && data && data.length === size;

    //Page status
    const status = useMemo(() => {
        const isLoadingMore =
            isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
        const isEmpty = data?.[0]?.length === 0;
        const isReachingEnd =
            isEmpty || (data && data[data.length - 1]?.length < pageLimit);

        const allRows = data ? data.reduce((
            acc: Order[], pageData) => acc.concat(pageData), []
        ) : [];

        return {
            isLoadingMore,
            isEmpty,
            isReachingEnd,
            rows: allRows
        }

    }, [isLoading, size, data, pageLimit]);


    useEffect(() => {
        mutate()
    }, [searchParams])

    //Fetch search counts
    useEffect(() => {
        get<number>({ url: APIs.orders.counts })
            .then(res => {
                setPageLimit(res.data || 1);
            }).catch(err => {
                alert((err as Error).message);
            });
    }, []);

    if ((isLoadingInitialData || isRefreshing) && pageLimit) {
        return (
            <Stack spacing={2} className="px-5">
                {[1, 2, 3, 4].map((key) => (
                    <React.Fragment key={key}>
                        <TaskListSkeleton />
                        <Divider />
                    </React.Fragment>
                ))}
            </Stack>
        )
    }


    return (
        <InfiniteScroll
            isReachingEnd={!!status.isReachingEnd}
            setSize={setSize}
            size={size}
            isEmpty={status.isEmpty}
            isLoadingMore={!!status.isLoadingMore}
            error={error}
        >
            <TaskList data={status.rows} />
        </InfiniteScroll>
    );
}

export default Content;
