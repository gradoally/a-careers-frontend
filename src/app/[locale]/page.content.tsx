"use client"

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef, memo } from "react";

import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { CircularLoading } from "@/components/features/Loaders";
import CenteredContainer from "@/components/ui/CenteredContainer";
import TaskListSkeleton from "@/components/Task/TaskListSkeleton";
import TaskList from "@/components/Task/TaskList";
import Divider from "@/components/ui/Divider";

import { getOrders } from "@/services/order";
import { Order } from "@/openapi/client/models/Order";

import { getOrdersCount } from "@/services/order";
import { useTonConnect } from "@/hooks/useTonConnect";

function SkeletonLoader() {
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

function Content() {
    const searchParams = useSearchParams();
    const trans = useTranslations();
    const { connectionChecked } = useTonConnect();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageLimit, setPageLimit] = useState(0);
    const [query, setQuery] = useState<Record<string, any>>({
        page: -1,
        orderBy: "createdAt",
        translateTo: "en"
    });
    const [tasks, setTasks] = useState<Order[]>([]);

    useEffect(() => {
        if (!pageLimit) return;
        setQuery({ ...query, page: 0 });
    }, [pageLimit]);

    //Update Query State
    useEffect(() => {

    }, [searchParams]);

    //Load orders on query update
    useEffect(() => {
        if (!connectionChecked) return;
        if (query.page < 0) return;
        if (loading && tasks.length) return;
        setLoading(true);
        const queryStr = new URLSearchParams(query).toString();
        getOrders(queryStr)
            .then((res) => {
                setTasks([...tasks, ...(res.data || [])])
            })
            .catch(console.log)
            .finally(() => setLoading(false));
    }, [query, connectionChecked]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        //setup scroll event
        const handleScroll = () => {
            const scrolled = Math.round(container.scrollHeight - container.scrollTop);
            const isEndReached = (scrolled === container.clientHeight ||
                scrolled - container.clientHeight < 10) &&
                !loading

            //update query to fetch new posts
            if (isEndReached) {
                query.page += 1;
                setQuery({ ...query });
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //Fetch search counts
    useEffect(() => {
        if (!connectionChecked) return;
        if (pageLimit) return;
        getOrdersCount()
            .then(res => {
                setPageLimit(res.data || 1);
            }).catch(err => {
                alert((err as Error).message);
            });
    }, [connectionChecked]);

    return (
        <div
            className="w-full h-full"
            ref={containerRef}
        >
            {
                !loading && !tasks.length ? (
                    <CenteredContainer>
                        <Typography component="div" variant="caption">
                            {trans("common.no_more_data")}
                        </Typography>
                    </CenteredContainer>
                ) : <TaskList data={tasks} />
            }
            {loading && (tasks.length ? <CircularLoading /> : <SkeletonLoader />)}
        </div>
    );
}

export default memo(Content);
