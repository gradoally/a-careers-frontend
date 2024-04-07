import React from "react";
import { useLocale } from "next-intl";

import { useAuthContext } from "@/lib/provider/auth.provider";

import useTaskMetaInfo from "@/hooks/useTaskFunc";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Divider from "../ui/Divider";
import Link from "../Link";
import StatusChip from "./StatusChip";
import { Order } from "../../openapi/client";

import { formatDatetime } from "../../lib/helper";

const TaskItem = ({ order, locale, hideStatus }: { order: Order, locale: string, hideStatus?: boolean }) => {
    const { user } = useAuthContext();
    const { statusCode, isCustomer } = useTaskMetaInfo(order, user?.data)
    return (
        <Link className="flex flex-col space-y-[3px] transition-colors hover:bg-gray-900 delay-200 px-5 py-2"
            sx={{
                color: "common.white",
                '&:hover': {
                    color: "common.white",
                }
            }}
            href={`/tasks/${order?.index}`}>
            <div className="text-[12px] leading-5 font-SFProBold font-[700]">
                {order?.name}
            </div>
            <Typography component="div" variant="caption" className="!text-[10px] !mt-[9px] !mb-[8px] !leading-none">
                {formatDatetime({ date: order?.createdAt, locale })} - {formatDatetime({ date: order?.deadline, locale })}
            </Typography>
            <Typography className="font-SFProLight !text-[12px] !leading-none">
                💎 {order?.price}
            </Typography>
            {!hideStatus && <StatusChip styles="!mt-[8px]" statusCode={statusCode} isCustomer={isCustomer} count={order.responsesCount} />}
        </Link>
    )
}

const MemoTaskItem = React.memo(TaskItem)

const TaskList = ({ data, hideStatus }: { data: Order[]; hideStatus?: boolean }) => {
    const locale = useLocale();
    return (
        <Stack spacing={"15px"} divider={<Divider />}>
            {data.map((e, i) => <MemoTaskItem key={i} hideStatus={hideStatus} order={e} locale={locale} />)}
        </Stack>
    )
}

export default TaskList;
