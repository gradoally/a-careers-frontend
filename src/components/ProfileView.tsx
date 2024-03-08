import React from "react";
import {useTranslations} from "next-intl";

import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import Link from "@/components/Link";
import UserAvatar from "@/components/UserAvatar";
import CopyContainer from "@/components/features/copy";
import ReadMoreCollapse from "@/components/features/ReadMoreCollapse";

import { IUser } from "@/interfaces";

interface HistoryType {
    date: string;
    type: string;
    title: string;
    smartContract: string;
    price: string;
}

const History = ({data}: { data: HistoryType[] }) => {
    return (
        <Stack component="div" spacing="1px" className="mt-5">
            {data.map((e, i) => (
                <Stack className="bg-info px-[20px] py-2" direction="column" key={i}>
                    <Typography variant="caption" component="div">{e.date}</Typography>
                    <Stack direction="row" spacing={1} className="h-[30px]">
                        <div>{e.type === 'in' ? "↘" : "↗"}</div>
                        <div className="flex-grow">
                            <Typography component="div" variant="body2">
                                {e.title}
                            </Typography>
                            <Typography component="div" color="secondary" variant="body2">
                                <Link target="_blank" noLinkStyle href={`https://tonviewer.com/${e.smartContract}`}>
                                    {e.smartContract}
                                </Link>
                            </Typography>
                        </div>
                        {e.price && (
                            <Typography component="div" variant="h6">{e.price}</Typography>
                        )}
                    </Stack>
                </Stack>
            ))}
        </Stack>
    )
}


const ProfileView = ({data}: { data: IUser}) => {
    const t = useTranslations();

    const renderSpecialization = () => {
        if (!data?.specialization) return <div/>
        const specialization = data.specialization.split(",")
        return specialization.map((e: string, i: number) => <Chip key={i} label={e} color="secondary"/>)
    }
    return (
        <>
            <div className="bg-info bg-opacity-20 h-[180px] w-full flex flex-col justify-center items-center">
                <UserAvatar src="/gifs/unicorn-hight" height="90px" width="90px"/>
                <div className="mt-2.5 text-lg font-bold">{data?.nickname}</div>
            </div>
            <Stack spacing={"20px"} className="pt-[35px] px-5">
                <div>
                    <Typography component="div" variant="caption">
                        {t("common.smart_contract_address")}
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
                            <Link noLinkStyle href={`https://t.me/${data.telegram}`}>
                                @{data.telegram}
                            </Link>
                        </Typography>
                    )}
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {t("profile.about")}
                    </Typography>
                    {data?.about && (
                        <ReadMoreCollapse read_more={t("read_more.read_more")} hide={t("read_more.hide")}
                                          className="mt-1 text-xs" text={data.about}/>
                    )}
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {t("profile.site")}
                    </Typography>
                    <Typography className="mt-1" variant="body2">
                        {data?.website}
                    </Typography>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {t("profile.portfolio")}
                    </Typography>
                    <Typography className="mt-1" variant="body2">
                        {data?.portfolio}
                    </Typography>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {t("profile.resume")}
                    </Typography>
                    <Typography variant="body2">
                        {data?.resume}
                    </Typography>
                </div>
                <div>
                    <Typography component="div" variant="caption">
                        {t("profile.specialization")}
                    </Typography>
                    <Stack component="div" className="mt-1" direction={"row"} spacing={1}>
                        {renderSpecialization()}
                    </Stack>
                </div>

                <div>
                    <Typography variant="h4">{t("profile.task_history")}</Typography>
                    <Typography className="mt-2" variant="body2">
                        {t("profile.task_result", {"payed": "100%", completed: "99%"})}
                    </Typography>
                </div>
            </Stack>
            {/*{history && <History data={history}/>}*/}
        </>
    )
}

export default ProfileView;
