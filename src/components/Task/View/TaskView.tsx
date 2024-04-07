import React, { Fragment, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import StatusChip from "@/components/Task/StatusChip";
import CopyContainer from "@/components/features/copy";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import UserAvatar from "@/components/UserAvatar";

import { formatDatetime } from "@/lib/helper";
import { truncateMiddleText } from "@/lib/utils/tools";

import { useAppContext } from "@/lib/provider/app.providers";
import { ITaskMetaInfo } from "@/hooks/useTaskFunc";
import { IStats } from "@/hooks/useUserStats";

import { Order } from "@/openapi/client";
import { IUser } from "@/interfaces";
import { IContent } from "@/interfaces/request";

const StackContainer = ({ primary, secondary }: {
    primary: string | React.ReactNode;
    secondary: string;
}) => {
    return (
        <Stack component="div" className="mt-[20px]" direction="column">
            <Typography component="div" variant={"caption"}>
                {secondary}
            </Typography>
            {typeof primary === "string" ? <Typography variant="body2" style={{ wordBreak: "break-word", marginTop: "4px" }}>
                {primary}
            </Typography> : primary}
        </Stack>
    )
}

function Profile(props: {
    locale: string;
    user?: IUser;
    stats: IStats;
    userType: "customer" | "freelancer"
}) {

    const trans = useTranslations();
    const telegram = useMemo(() => {
        let tg = props.user?.telegram;
        return (tg && tg.startsWith("@")) ? tg.slice(1) : tg;
    }, [props.user]);

    return <Stack className="mt-7" direction={"column"}>
        <Typography className="!font-SFProSemiBold !text-[12px]" >{trans(`common.${props.userType}`)}</Typography>
        <div className="mt-5">
            <Stack component="div" direction="row" spacing={3}>
                <UserAvatar height="80px" width="80px" />
                <Stack direction="column" className="!my-auto" spacing="4px" component="div">
                    <Typography variant="body2">@{props?.user?.nickname}</Typography>
                    <Stack component="div" sx={{ fontSize: "10px" }} direction="row" spacing="5px">
                        <div className="opacity-70">✅ {props.stats.freelancer}</div>
                        <div className="opacity-40">❎ {props.stats.customer}</div>
                    </Stack>
                    <Stack component="div" className="text-[10px]" direction="row" spacing="10px">
                        <div className="border-b border-white text-white opacity-[40%]">
                            <Link noLinkStyle href={`/profile/${props?.user?.index}`}>
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

const MemoizedCustomer = React.memo(Profile);

export default function TaskView({
    task,
    info,
    stats
}: { task: IContent<Order | null>, info: ITaskMetaInfo, stats: IStats }) {

    const locale = useLocale();
    const trans = useTranslations();
    const [originalTL, setOriginalTL] = useState(false);
    const { getCategory, getLanguage } = useAppContext();

    return (task.content &&
        <Fragment>
            <Stack spacing={1}>
                <StatusChip
                    statusCode={info.statusCode}
                    isCustomer={info.isCustomer}
                    count={task.content.responsesCount || 0}
                />
                <Typography className="!text-[16px] !font-SFProSemiBold !leading-25px] !font-[700]" >{(originalTL ? task.content?.nameTranslated : task.content?.name)}</Typography>
                <Typography className="!text-[12px] !font-SFProLight">💎 {task.content?.price}</Typography>
            </Stack>
            <Stack component="div" className="mt-4" direction="column">
                <Typography component="div" variant={"caption"}>{trans("common.smart_contract_address")}</Typography>
                {task.content?.address && (
                    <CopyContainer className="!m-0 !mt-1 !h-fit">
                        <Typography className="!font-SFProRegular !text-[12px]" >{truncateMiddleText(task.content.address, 10)}</Typography>
                    </CopyContainer>
                )}
            </Stack>
            <StackContainer
                primary={
                    <Stack direction={"row"} spacing={"10px"}>
                        <Typography variant="body2" style={{ wordBreak: "break-word", marginTop: "4px" }}>
                            {trans(`locale_switcher.${getLanguage(task.content?.language || "")?.code}`)}
                        </Typography>
                        {!info.isSameLanguage && <Typography
                            variant="body2"
                            color="secondary"
                            onClick={() => setOriginalTL(!originalTL)}
                            style={{
                                wordBreak: "break-word",
                                marginTop: "4px",
                                cursor: "pointer"
                            }}
                        >
                            {originalTL ? "DeepL Translation" : trans('task.original_translation')}
                        </Typography>}
                    </Stack>
                }
                secondary={trans("tasks.language")}
            />
            {(info.isHired || info.isCustomer) && task.content?.result && <StackContainer primary={task.content?.result ?? ""} secondary={trans("common.result")} />}
            <StackContainer primary={(originalTL ? task.content.descriptionTranslated : task.content?.description) || ""} secondary={trans("common.description")} />
            <StackContainer primary={(originalTL ? task.content.technicalTaskTranslated : task.content?.technicalTask) || ""} secondary={trans("common.technical_task")} />
            <StackContainer
                primary={formatDatetime({ date: task.content?.deadline, locale: locale })}
                secondary={trans("common.deadline")} />
            <Divider className="!mb-3 !mt-8" />
            <Stack className="!text-[10px] !font-SFProLight !leading-none opacity-[40%]" direction="column">
                <div className="truncate w-[300px] mt-[6px]">{trans("task.createdAt", {
                    date: formatDatetime({ date: task.content?.createdAt, locale: locale }),
                    language: trans(`locale_switcher.${getLanguage(task.content?.language || "")?.code}`)
                })}
                </div>
                <div className="truncate w-[200px] mt-[10px]">{trans("task.category", { value: getCategory(task.content?.category || "")?.code })}</div>
            </Stack>
            {
                info.isProfile.customer && <MemoizedCustomer
                    locale={locale}
                    user={task.content.customer}
                    stats={stats}
                    userType="customer"
                />
            }
            {
                info.isProfile.freelancer && <MemoizedCustomer
                    locale={locale}
                    user={task.content.freelancer}
                    stats={stats}
                    userType="freelancer"
                />
            }
        </Fragment>
    )
}
