import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import Link from "@/components/Link";
import CopyContainer from "@/components/features/copy";
import ReadMoreCollapse from "@/components/features/ReadMoreCollapse";
import { Skill } from "./forms/ProfileForm";

import { IUser } from "@/interfaces";

import ProfileIcon from "@/assets/gif/unicorn-low.gif";

import { getUserActivity } from "@/services/profile";

import { OrderActivity } from "@/openapi/client";

/*interface HistoryType {
    date: string;
    type: string;
    title: string;
    smartContract: string;
    price: string;
}*/

const History = ({ data }: { data: OrderActivity[] }) => {
    return (
        <Stack component="div" spacing="1px" className="mt-5">
            {data.map((e, i) => (
                <Stack className="bg-info px-[20px] py-2" direction="column" key={i}>
                    <Typography variant="caption" component="div">{e.timestamp}</Typography>
                    <Stack direction="row" spacing={1} className="h-[30px]">
                        <div>{"in" === 'in' ? "↘" : "↗"}</div>
                        <div className="flex-grow">
                            <Typography component="div" variant="body2">
                                {e.order?.technicalTask}
                            </Typography>
                            <Typography component="div" color="secondary" variant="body2">
                                <Link target="_blank" noLinkStyle href={`https://tonviewer.com/${e.senderAddress}`}>
                                    {e.senderAddress}
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

const Status = ({ status }: { status: keyof typeof statusObj }) => {
    const { color, label } = statusObj[status] || { color: "grey", label: "Pending" };
    return <div className="flex mx-auto my-2">
        <span className={`block w-[7px] h-[7px] my-auto mr-1 rounded-full`} style={{ background: color }}></span>
        <span className="font-[400] text-[10px]">{label}</span>
    </div>
}

const ProfileView = ({ data }: { data: IUser }) => {

    const trans = useTranslations();

    const [history, setHistory] = useState<{ loading: boolean; activities: OrderActivity[] }>({
        loading: false,
        activities: []
    });

    const renderSpecialization = () => {
        if (!data?.specialization) {
            data.specialization = "FunC,FIFT";
            //return <div/>
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
        <>
            <div className="bg-info bg-opacity-20 h-[180px] w-full flex flex-col justify-center items-center">
                {/*<UserAvatar src="/gifs/unicorn-hight" height="90px" width="90px"/>*/}
                <Image src={ProfileIcon} alt="Fixed" width={90} height={90} />
                <div className="mt-2.5 text-lg font-bold">{data?.nickname}</div>
                <Status status={((data?.userStatus || "pending") as keyof typeof statusObj)} />
            </div>
            <Stack spacing={"20px"} className="pt-[35px] px-5">
                <div>
                    <Typography component="div" variant="caption">
                        {trans("common.smart_contract_address")}
                    </Typography>
                    <CopyContainer className="mt-1">
                        <Typography color="secondary" variant="body2">
                            <Link target="_blank" noLinkStyle href={`http://tonviewer.com/${data?.address}`}>
                                {data?.address}
                            </Link>
                        </Typography>
                    </CopyContainer>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        Telegram
                    </Typography>
                    {data?.telegram && (
                        <Typography className="mt-1" color="secondary" variant="body2">
                            <Link noLinkStyle href={`https://trans.me/${data.telegram}`}>
                                @{data.telegram}
                            </Link>
                        </Typography>
                    )}
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {trans("profile.about")}
                    </Typography>
                    {data?.about && (
                        <ReadMoreCollapse read_more={trans("read_more.read_more")} hide={trans("read_more.hide")}
                            className="mt-1 text-xs" text={data.about} />
                    )}
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {trans("profile.site")}
                    </Typography>
                    <Typography className="mt-1" variant="body2">
                        {data?.website}
                    </Typography>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {trans("profile.portfolio")}
                    </Typography>
                    <Typography className="mt-1" variant="body2">
                        {data?.portfolio}
                    </Typography>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {trans("profile.resume")}
                    </Typography>
                    <Typography variant="body2">
                        {data?.resume}
                    </Typography>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {trans("profile.specialization")}
                    </Typography>
                    <Stack component="div" className="mt-1" direction={"row"} spacing={1}>
                        {renderSpecialization()}
                    </Stack>
                </div>

                <div>
                    <Typography variant="h4">{trans("profile.task_history")}</Typography>
                    <Typography className="mt-2" variant="body2">
                        {trans("profile.task_result", { "payed": "100%", completed: "99%" })}
                    </Typography>
                </div>
            </Stack>
            <History data={history.activities} />
        </>
    )
}

export default ProfileView;
