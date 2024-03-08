import {Stack} from "@mui/material";
import StatusChip from "@/components/StatusChip";
import Typography from "@mui/material/Typography";
import CopyContainer from "@/components/features/copy";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import React from "react";
import {useLocale, useTranslations} from "next-intl";
import UserAvatar from "@/components/UserAvatar";
import {Order} from "@/openapi/client";
import {formatDatetime} from "@/lib/helper";
const StackContainer = ({primary, secondary}: {
    primary: string;
    secondary: string;
}) => {
    return (
        <Stack component="div" spacing={"3px"} direction="column">
            <Typography component="div" variant={"caption"}>
                {secondary}
            </Typography>
            <Typography variant="body2">
                {primary}
            </Typography>
        </Stack>
    )
}


const TaskView = ({data}: {data: Order}) => {
    const tc = useTranslations("common");
    const trans = useTranslations("tasks");
    const locale = useLocale();
    let telegram = data?.customer?.telegram
    if (telegram && telegram.startsWith("@")){
        telegram.slice(1)
    }
    return (
        <>
            <Stack spacing={1}>
                <StatusChip status={"no_responses"}/>
                <Typography variant="h4">{data?.name}</Typography>
                <Typography variant="body2">💎 {data?.price}</Typography>
            </Stack>
            <Stack component="div" spacing={"3px"} direction="column">
                <Typography component="div" variant={"caption"}>
                    {tc("smart_contract_address")}
                </Typography>
                {data?.address && (
                    <CopyContainer >
                        <Typography variant="body2">{data.address}</Typography>
                    </CopyContainer>
                )}
            </Stack>
            <StackContainer primary={data?.language??""} secondary={trans("language")}/>
            <StackContainer primary={data?.description??""} secondary={tc("description")}/>
            <StackContainer primary={data?.technicalTask??""} secondary={tc("technical_task")}/>
            <StackContainer
                primary={formatDatetime({date: data?.deadline, locale: locale})}
                secondary={tc("deadline")}/>
            <Divider/>
            <Stack className="text-[10px] leading-5 opacity-[40%]" spacing={"0"} direction="column">
                <div>{formatDatetime({date: data?.createdAt, locale: locale})}</div>
                <div>{data?.category}</div>
            </Stack>
            {data?.customer && (
                <Stack spacing={"20px"} direction={"column"}>
                    <Typography variant="body2">{tc("customer")}</Typography>
                    <div>
                        <Stack component="div" direction="row" spacing={3}>
                            <UserAvatar height="80px" width="80px"/>
                            <Stack direction="column" spacing="7px" component="div">
                                <Typography variant="body2">@{data?.customer?.nickname}</Typography>
                                <Stack component="div" sx={{fontSize: "10px"}} direction="row" spacing="5px">
                                    <div className="opacity-70">✅ 2</div>
                                    <div  className="opacity-40">❎ 1</div>
                                </Stack>
                                <Stack component="div" className="text-[10px]" direction="row" spacing="10px">
                                    <div className="underline text-white opacity-[40%]">
                                        <Link noLinkStyle href={`/profile/${data?.customer?.index}`}>
                                            {tc("profile")} 📖
                                        </Link>
                                    </div>
                                    {telegram && (
                                        <div className="underline text-white opacity-[40%]">
                                            <Link noLinkStyle href={`https://trans.me/${telegram}`}>
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
