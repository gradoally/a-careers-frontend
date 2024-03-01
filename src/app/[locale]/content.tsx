"use client"

import React from "react";
import {useSearchParams} from "next/navigation";
import {useLocale} from "next-intl";
import useSWRInfinite from 'swr/infinite'
import {Order} from "@/openapi/client";
import InfiniteScroll from "@/components/InfiniteScroll";
import TaskList from "@/components/TaskList";
import Stack from "@mui/material/Stack";
import TaskListSkeleton from "@/components/TaskListSkeleton";
import Divider from "@/components/ui/Divider";

const PAGE_SIZE = 10;
const fetcher = async (url: string) => {
    const response = await fetch(url)
    return response.json()
}


const Content = () => {
    const locale = useLocale();
    const searchParams = useSearchParams();

    const getKey = (pageIndex: number, previousPageData: Order[]) => {
        // Use the previous page data to determine if this is the last page.
        if (previousPageData && !previousPageData.length) return null;
        const params = new URLSearchParams(searchParams)
        params.set("page", (pageIndex).toString());

        // Index starts from 0
        return `/${locale}/api/tasks/?${params.toString()}`;
    };

    const {
        data,
        error,
        size,
        setSize,
        isLoading,
        isValidating,
        mutate,
    } = useSWRInfinite<Order[] >(getKey, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateFirstPage: false,
        revalidateAll: false,
    });

    React.useEffect(() => {
        mutate()
    }, [searchParams])

    const isLoadingInitialData = !data && !error;
    const isRefreshing = isValidating && data && data.length === size;

    if (isLoadingInitialData || isRefreshing){
        return (
            <Stack spacing={2} className="px-5">
                {[1, 2, 3, 4].map((key) => (
                    <React.Fragment key={key}>
                        <TaskListSkeleton/>
                        <Divider/>
                    </React.Fragment>
                ))}
            </Stack>
        )
    }

    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    const allRows = data ? data.reduce((
        acc: Order[], pageData) => acc.concat(pageData), []
    ) : [];

    return (
        <InfiniteScroll isReachingEnd={!!isReachingEnd}
                        setSize={setSize} size={size} isEmpty={isEmpty}
                        isLoadingMore={!!isLoadingMore} error={error}>
            <TaskList data={allRows}/>
        </InfiniteScroll>
    )


}

export default Content;