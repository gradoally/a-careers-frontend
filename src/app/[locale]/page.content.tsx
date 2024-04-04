"use client"

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef, memo } from "react";

import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

import TaskListSkeleton from "@/components/Task/TaskListSkeleton";
import TaskList from "@/components/Task/TaskList";
import Divider from "@/components/ui/Divider";
import Shell from "@/components/layout/Shell";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Filter from "@/components/layout/filter";
import CenteredContainer from "@/components/ui/CenteredContainer";
import FilterButton from "@/components/ui/buttons/FilterButton";
import { CircularLoading } from "@/components/features/Loaders";

import { getOrders } from "@/services/order";
import { Order } from "@/openapi/client";

import { getOrdersCount } from "@/services/order";
import { useTonConnect } from "@/hooks/useTonConnect";
import { useAuthContext } from "@/lib/provider/auth.provider";

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
    const { user } = useAuthContext();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageLimit, setPageLimit] = useState({ count: 0, loading: false });
    const [query, setQuery] = useState<Record<string, any>>({
        page: -1,
        sort: "desc"
    });
    const [countQuery, setCountQuery] = useState<Record<string, any>>({});
    const [tasks, setTasks] = useState<Order[]>([]);

    useEffect(() => {
        if (pageLimit.loading || !pageLimit.count) return;
        setQuery({ ...query, page: 0 });
    }, [pageLimit]);

    //Update query state
    useEffect(() => {
        ["translateTo", "category", "orderBy", "minPrice"].map((key) => {
            const value = searchParams.get(key);
            if (value) {
                query[key] = value;
                key !== "orderBy" && (countQuery[key] = value);
            } else {
                delete query[key];
                key !== "orderBy" && (delete countQuery[key]);
            }
        });
        setQuery({ ...query });
        setCountQuery({ ...countQuery });
    }, [searchParams]);

    //Fetch search counts
    useEffect(() => {
        if (pageLimit.loading) return;
        setPageLimit({ ...pageLimit, loading: true });
        const queryStr = new URLSearchParams(countQuery).toString();
        getOrdersCount(queryStr)
            .then(res => {
                setPageLimit({ count: res.data || 1, loading: false });
            }).catch(err => {
                setPageLimit({ count: 0, loading: false });
                alert((err as Error).message);
            });
    }, [countQuery]);

    //Load orders on query update
    useEffect(() => {
        if (!connectionChecked) return;
        if (query.page < 0) return;
        if (loading && tasks.length) return;
        setLoading(true);
        if (user?.data?.index !== undefined)
            query.currentUserIndex = user.data.index;
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

    return (

        <Shell
            header={
                <Header messages={{ "connect": trans("common.connect"), "find": trans("tasks.find") }} />
            }
            withDrawer
            footer={
                <Footer transparent={true}>
                    <FilterButton>{trans("buttons.filter")}</FilterButton>
                </Footer>
            }
            extra={<Filter />}
        >
            <div className="pt-[15px]">
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
            </div>
        </Shell>
    );
}

export default memo(Content);
