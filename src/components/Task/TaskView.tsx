import React, { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Stack } from "@mui/material";
import StatusChip, { Statuses } from "@/components/Task/StatusChip";
import Typography from "@mui/material/Typography";
import CopyContainer from "@/components/features/copy";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import UserAvatar from "@/components/UserAvatar";
import { Order } from "@/openapi/client";
import { formatDatetime } from "@/lib/helper";
import { truncateMiddleText } from "@/lib/utils/tools";
import { getUserStatus } from "@/services/profile";
import { useAppContext } from "@/lib/provider/app.providers";
import { ITaskMetaInfo } from "@/hooks/useTaskFunc";
import { IUser } from "@/interfaces";

const StackContainer = ({ primary, secondary }: {
    primary: string;
    secondary: string;
}) => {
    return (
        <Stack component="div" className="mt-[20px]" direction="column">
            <Typography component="div" variant={"caption"}>
                {secondary}
            </Typography>
            <Typography variant="body2" style={{ wordBreak: "break-word", marginTop: "4px" }}>
                {primary}
            </Typography>
        </Stack>
    )
}

function Customer(props: {
    locale: string;
    customer: IUser;
}) {

    const trans = useTranslations();
    const [status, setStatus] = useState<{ freelancer: number; customer: number }>({ freelancer: 0, customer: 0 })

    const telegram = useMemo(() => {
        let tg = props.customer?.telegram;
        return (tg && tg.startsWith("@")) ? tg.slice(1) : tg;
    }, [props.customer]);

    useEffect(() => {
        if (!props?.customer?.address || (props?.customer?.index || -1) < 0) return;
        getUserStatus({ address: props?.customer?.address, index: props?.customer.index || -1, locale: props.locale })
            .then(res => {
                setStatus({
                    freelancer: res.data?.asFreelancerTotal || 0,
                    customer: res.data?.asCustomerTotal || 0
                });
            }).catch(err => {
                console.log((err as Error).message);
            });
    }, [props]);

    return <Stack className="mt-6" direction={"column"}>
        <Typography className="!font-InterSemiBold !text-[12px]" >{trans("common.customer")}</Typography>
        <div className="mt-3">
            <Stack component="div" direction="row" spacing={3}>
                <UserAvatar height="80px" width="80px" />
                <Stack direction="column" className="!my-auto" spacing="7px" component="div">
                    <Typography variant="body2">@{props?.customer?.nickname}</Typography>
                    <Stack component="div" sx={{ fontSize: "10px" }} direction="row" spacing="5px">
                        <div className="opacity-70">✅ {status.freelancer}</div>
                        <div className="opacity-40">❎ {status.customer}</div>
                    </Stack>
                    <Stack component="div" className="text-[10px]" direction="row" spacing="10px">
                        <div className="border-b border-white text-white opacity-[40%]">
                            <Link noLinkStyle href={`/profile/${props?.customer?.index}`}>
                                {trans("common.profile")} 📖
                            </Link>
                        </div>
                        {telegram && (
                            <div className="border-b border-white text-white opacity-[40%]">
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
}

const MemoizedCustomer = React.memo(Customer);

export default function TaskView({
    data,
    info
}: { data: Order, info: ITaskMetaInfo }) {

    const locale = useLocale();
    const trans = useTranslations();
    const { getCategory, getLanguage } = useAppContext();

    return (
        <>
            <Stack spacing={1}>
                <StatusChip
                    status={Statuses[info.statusCode]}
                    count={data.responsesCount || 0}
                />
                <Typography className="!text-[16px] !leading-25px] !font-InterSemiBold !font-[700]" >{data?.name}</Typography>
                <Typography className="!text-[12px] !font-InterLight">💎 {data?.price}</Typography>
            </Stack>
            <Stack component="div" className="mt-4" direction="column">
                <Typography component="div" variant={"caption"}>{trans("common.smart_contract_address")}</Typography>
                {data?.address && (
                    <CopyContainer className="!m-0 !mt-1 !h-fit">
                        <Typography className="!font-InterRegular !text-[12px]" >{truncateMiddleText(data.address, 10)}</Typography>
                    </CopyContainer>
                )}
            </Stack>
            <StackContainer primary={trans(`locale_switcher.${getLanguage(data?.language || "")?.code}`)} secondary={trans("tasks.language")} />
            <StackContainer primary={data?.description ?? ""} secondary={trans("common.description")} />
            <StackContainer primary={data?.technicalTask ?? ""} secondary={trans("common.technical_task")} />
            <StackContainer
                primary={formatDatetime({ date: data?.deadline, locale: locale })}
                secondary={trans("common.deadline")} />
            <Divider className="!my-3" />
            <Stack className="!text-[10px] !font-InterRegular !leading-5 opacity-[40%]" direction="column">
                <div className="truncate w-[300px]">{trans("task.createdAt", {
                    date: formatDatetime({ date: data?.createdAt, locale: locale }),
                    language: trans(`locale_switcher.${getLanguage(data?.language || "")?.code}`)
                })}
                </div>
                <div className="truncate w-[200px] mt-1">{trans("task.category", { value: getCategory(data?.category || "")?.code })}</div>
            </Stack>
            {
                !info.isCustomer && data.customer && <MemoizedCustomer
                    locale={locale}
                    customer={data.customer}
                />
            }
        </>
    )
}
