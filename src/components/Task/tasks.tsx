import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

import { Typography } from "@mui/material";

import { CircularLoading } from "@/components/features/Loaders";
import CenteredContainer from "@/components/ui/CenteredContainer";

import { getOrders } from "@/services/order";
import { Order } from "@/openapi/client";

export default function Tasks(props: React.PropsWithChildren) {

    const trans = useTranslations();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Order[]>([]);
    const [req, setReq] = useState<{
        query: Record<string, any>
    }>({
        query: {
            page: -1,
        }
    });

    useEffect(() => {
        //Load Remote Posts
        if (loading || req.query.page < 0) return;
        setLoading(true);
        const query = new URLSearchParams(req.query).toString();
        getOrders(query)
            .then((res) => {
                setTasks([...tasks, ...(res.data || [])])
            })
            .catch(console.log)
            .finally(() => setLoading(false));
    }, [req]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        //setup scroll event
        const handleScroll = () => {
            const scrolled = Math.round(container.scrollHeight - container.scrollTop);
            const isEndReached = (scrolled === container.clientHeight ||
                scrolled - container.clientHeight < 10) &&
                !loading

            if (isEndReached) {
                //update query to fetch new posts
                req.query.page += 1;
                setReq({
                    query: { ...req.query }
                });
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                ) : props.children
            }
            {loading && <CircularLoading />}
        </div>
    );
}

