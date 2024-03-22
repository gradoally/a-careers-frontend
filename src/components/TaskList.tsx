import React from "react";
import { useLocale } from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import StatusChip from "@/components/StatusChip";
import { Order } from "@/openapi/client";

import { convertIsoToCustomFormat } from "@/lib/utils/tools";


const TaskItem = ({ order }: { order: Order, locale: string }) => {
    return (
        <Link className="flex flex-col space-y-[3px] transition-colors hover:bg-gray-900 delay-200 px-5 py-2"
            sx={{
                color: "common.white",
                '&:hover': {
                    color: "common.white",
                }
            }}
            href={`/tasks/${order?.index}`}>
            <div className="text-[12px] leading-5 font-InterSemiBold font-[700]">
                {order?.name}
            </div>
            <Typography component="div" variant="caption" className="!text-[10px] leading-[15px]">
                {convertIsoToCustomFormat(order?.createdAt || "")} - {convertIsoToCustomFormat(order?.deadline || "")}
            </Typography>
            <Typography className="font-InterLight !text-[12px] leading-[14px]">
                💎 {order?.price}
            </Typography>
            {
                order?.responsesCount === 0 && <StatusChip status={"no_responses"} />
            }
        </Link>
    )
}

const MemoTaskItem = React.memo(TaskItem)


const TaskList = ({ data }: { data: Order[] }) => {
    const locale = useLocale();

    return (
        <Stack spacing={"15px"} divider={<Divider />}>
            {data.map((e, i) => {
                return (
                    <MemoTaskItem
                        key={i}
                        order={e}
                        locale={locale}
                    />
                )
            })}
        </Stack>
    )
}

export default TaskList;
