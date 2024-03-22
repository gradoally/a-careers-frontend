import { Stack } from "@mui/material";
import StatusChip from "@/components/StatusChip";
import Typography from "@mui/material/Typography";
import CopyContainer from "@/components/features/copy";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import UserAvatar from "@/components/UserAvatar";
import { Order } from "@/openapi/client";
import { formatDatetime } from "@/lib/helper";
import { truncateMiddleText } from "@/utils/tools";
import { getUserStatus } from "@/services/profile";

const StackContainer = ({ primary, secondary }: {
    primary: string;
    secondary: string;
}) => {
    return (
        <Stack component="div" className="mt-4" direction="column">
            <Typography component="div" variant={"caption"}>
                {secondary}
            </Typography>
            <Typography variant="body2" style={{ wordBreak: "break-word", }}>
                {primary}
            </Typography>
        </Stack>
    )
}


const TaskView = ({ data }: { data: Order }) => {
    const tc = useTranslations("common");
    const trans = useTranslations("tasks");
    const locale = useLocale();
    const [status, setStatus] = useState<{ freelancer: number; customer: 0 }>({ freelancer: 0, customer: 0 })

    let telegram = data?.customer?.telegram
    if (telegram && telegram.startsWith("@")) {
        telegram.slice(1)
    }

    useEffect(() => {
        if (!data.customer || !data.customer?.address || !data.customer?.index) return;
        getUserStatus({ address: data.customer.address, index: data.customer.index, locale })
            .then(res => {
                setStatus({
                    freelancer: res.data?.asFreelancerTotal || 0,
                    customer: res.data?.asCustomerTotal || 0
                });
            }).catch(err => {
                console.log((err as Error).message);
            });
    }, [data.customer]);

    return (
        <>
            <Stack spacing={1}>
                <StatusChip status={"no_responses"} />
                <Typography variant="h4">{data?.name}</Typography>
                <Typography variant="body2">💎 {data?.price}</Typography>
            </Stack>
            <Stack component="div" spacing={"3px"} className="mt-4" direction="column">
                <Typography component="div" variant={"caption"}>{tc("smart_contract_address")}</Typography>
                {data?.address && (
                    <CopyContainer className="!m-0 !h-fit">
                        <Typography variant="body2">{truncateMiddleText(data.address, 10)}</Typography>
                    </CopyContainer>
                )}
            </Stack>
            <StackContainer primary={data?.language ?? ""} secondary={trans("language")} />
            <StackContainer primary={data?.description ?? ""} secondary={tc("description")} />
            <StackContainer primary={data?.technicalTask ?? ""} secondary={tc("technical_task")} />
            <StackContainer
                primary={formatDatetime({ date: data?.deadline, locale: locale })}
                secondary={tc("deadline")} />
            <Divider className="!my-3" />
            <Stack className="text-[10px] leading-5 opacity-[40%]" direction="column">
                <div>{formatDatetime({ date: data?.createdAt, locale: locale })}</div>
                <div className="truncate w-[200px]">{data?.category}</div>
            </Stack>
            {data?.customer && (
                <Stack className="mt-6" direction={"column"}>
                    <Typography variant="body2">{tc("customer")}</Typography>
                    <div className="mt-2">
                        <Stack component="div" direction="row" spacing={3}>
                            <UserAvatar height="80px" width="80px" />
                            <Stack direction="column" className="!my-auto" spacing="7px" component="div">
                                <Typography variant="body2">@{data?.customer?.nickname}</Typography>
                                <Stack component="div" sx={{ fontSize: "10px" }} direction="row" spacing="5px">
                                    <div className="opacity-70">✅ {status.freelancer}</div>
                                    <div className="opacity-40">❎ {status.customer}</div>
                                </Stack>
                                <Stack component="div" className="text-[10px]" direction="row" spacing="10px">
                                    <div className="underline text-white opacity-[40%]">
                                        <Link noLinkStyle href={`/profile/${data?.customer?.index}`}>
                                            {tc("profile")} 📖
                                        </Link>
                                    </div>
                                    {telegram && (
                                        <div className="underline text-white opacity-[40%]">
                                            <Link noLinkStyle href={`https://t.me/${telegram}`}>
                                                Telegram ↗
                                            </Link>
                                        </div>
                                    )}
                                </Stack>
                            </Stack>
                        </Stack>
                    </div>
                </Stack>
            )}
        </>
    )
}

export default TaskView;
