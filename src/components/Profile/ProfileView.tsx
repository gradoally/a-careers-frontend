import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import Link from "@/components/Link";
import CopyContainer from "@/components/features/copy";
import { Skill } from "./form/ProfileForm";

import { IUser } from "@/interfaces";

import ProfileIcon from "@/assets/gif/unicorn-low.gif";

import { getUserActivity } from "@/services/profile";

import { OrderActivity } from "@/openapi/client";
import { truncateMiddleText } from "@/lib/utils/tools";

interface IInfoProps extends React.PropsWithChildren {
    label: string;
    value?: string | null;
}

interface IProfileViewProps {
    data: IUser; publicView?: boolean
}

function History({ data }: { data: OrderActivity[] }) {
    return (
        <Stack component="div" spacing="1px" className="mt-5">
            {data.map((e, i) => (
                <Stack className="bg-info px-[20px] py-2" direction="column" key={i}>
                    <Typography variant="caption" component="div">{e.timestamp}</Typography>
                    <Stack direction="row" spacing={1} >
                        <div>{"in" === 'in' ? "↘" : "↗"}</div>
                        <div className="flex-grow">
                            <Typography component="div" variant="body2">
                                {e.order?.technicalTask}
                            </Typography>
                            <Typography component="div" color="secondary" variant="body2">
                                <Link target="_blank" noLinkStyle href={`https://tonviewer.com/${e.txHash}`}>
                                    {e?.txHash || "s"}
                                </Link>
                            </Typography>
                        </div>
                        {e.amount && (
                            <Typography component="div" variant="h6">{e.amount}</Typography>
                        )}
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
}

const statusObj = {
    "active": {
        color: "#00FF1A",
        label: "Active"
    },
    "moderation": {
        label: "On moderation",
        color: "#FFA800",
    },
    "banned": {
        label: "Banned",
        color: "#FF0000"
    },
    "pending": { color: "grey", label: "Pending" }
}

function Status({ status }: { status: keyof typeof statusObj }) {
    const { color, label } = statusObj[status] || { color: "grey", label: "Pending" };
    return <div className="flex mx-auto my-2">
        <span className={`block w-[7px] h-[7px] my-auto mr-1 rounded-full`} style={{ background: color }}></span>
        <span className="font-[400] text-[10px]">{label}</span>
    </div>
}

function Info(props: IInfoProps) {
    return props.value ? <div>
        <Typography component="div" variant="caption">
            {props.label}
        </Typography>
        {
            props.children || <Typography variant="body2">{props.value}</Typography>
        }
    </div> : <></>;
}

function ProfileView({ data, publicView }: IProfileViewProps) {

    const trans = useTranslations();

    const [history, setHistory] = useState<{ loading: boolean; activities: OrderActivity[] }>({
        loading: false,
        activities: []
    });

    const renderSpecialization = () => {
        if (!data?.specialization) {
            data.specialization = "";
        }
        const specialization = data.specialization.split(",")
        return specialization.map((e: string, i: number) => <Skill key={i} name={e} />)
    }

    useEffect(() => {
        if (history.loading) return;
        setHistory({ ...history, loading: true });
        getUserActivity({ index: `${data.index}`, page: 1, pageSize: 10 })
            .then(res => {
                setHistory({
                    loading: false,
                    activities: [...history.activities, ...(res.data || [])]
                });
            })
            .catch(() => {
                setHistory({
                    ...history,
                    loading: false
                });
            });
    }, [data]);

    return (
        <Fragment>
            <div className="bg-info bg-opacity-20 py-10 w-full flex flex-col justify-center items-center">
                <Image src={ProfileIcon} alt="Fixed" width={90} height={90} />
                <div className="mt-2.5 text-lg font-bold">{data?.nickname}</div>
                {!publicView && <Status status={((data?.userStatus || "pending") as keyof typeof statusObj)} />}
            </div>
            <Stack spacing={"20px"} className="pt-[35px] px-5">
                <Info
                    label={trans("common.smart_contract_address")}
                    value={data.address}
                >
                    <CopyContainer className="mt-1">
                        <Typography color="secondary" variant="body2">
                            <Link target="_blank" noLinkStyle href={`http://tonviewer.com/${data?.address}`}>
                                {truncateMiddleText(data?.address || "", 8)}
                            </Link>
                        </Typography>
                    </CopyContainer>
                </Info>
                <Info
                    label={"Telegram"}
                    value={data.telegram}
                >
                    <Typography className="mt-1" color="secondary" variant="body2">
                        <Link noLinkStyle href={`https://trans.me/${data.telegram}`}>
                            @{data.telegram}
                        </Link>
                    </Typography>
                </Info>
                <Info
                    label={trans("profile.about")}
                    value={data.about}
                />
                <Info
                    label={trans("profile.site")}
                    value={data?.website}
                />
                <Info
                    label={trans("profile.portfolio")}
                    value={data?.portfolio}
                />
                <Info
                    label={trans("profile.resume")}
                    value={data?.resume}
                />
                <Info
                    label={trans("profile.specialization")}
                    value={data?.specialization}
                >
                    <Stack component="div" className="mt-2 gap-3" direction={"row"} spacing={1}>
                        {renderSpecialization()}
                    </Stack>
                </Info>
            </Stack>

            {
                history.activities.length ? <>
                    <div className="mt-8 px-5">
                        <Typography variant="h4" className="!font-SFProSemiBold">{trans("profile.task_history")}</Typography>
                        <Typography className="!mt-2" variant="body2">
                            {trans("profile.task_result", { "payed": "100%", completed: "99%" })}
                        </Typography>
                    </div>
                    <History data={history.activities} />
                </> : <></>
            }
        </Fragment>
    )
}

export default ProfileView;