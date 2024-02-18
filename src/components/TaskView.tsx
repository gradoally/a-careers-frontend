import {Stack} from "@mui/material";
import StatusChip from "@/components/StatusChip";
import Typography from "@mui/material/Typography";
import CopyContainer from "@/components/features/copy";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import React from "react";
import {useTranslations} from "next-intl";
import UserAvatar from "@/components/UserAvatar";

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

interface Props {
    data: {
        title: string;
        diamonds: number;
        proposals: number;
        language: { label: string };
        description: string;
        technicalTask: string;
        deadline: string;
        createdAt: string;
        category: string;
        customer?: {
            "id": number;
            "image": string;
            "username": string;
            "telegram": string;
        },
        status: "declined" | "on_moderation" | "no_responses" | "response_sent"
    }
}


const TaskView = ({data}: Props) => {
    const tc = useTranslations("common");
    const t = useTranslations("tasks");
    return (
        <>
            <Stack spacing={1}>
                <StatusChip status={data.status}/>
                <Typography variant="h4">{data.title}</Typography>
                <Typography variant="body2">💎 {data.diamonds}</Typography>
            </Stack>
            <Stack component="div" spacing={"3px"} direction="column">
                <Typography component="div" variant={"caption"}>
                    {tc("smart_contract_address")}
                </Typography>
                <CopyContainer text="EQCISAJu…W_JqYM3t"/>
            </Stack>
            <StackContainer primary={data.language.label} secondary={t("language")}/>
            <StackContainer primary={data.description} secondary={tc("description")}/>
            <StackContainer primary={data.technicalTask} secondary={tc("technical_task")}/>
            <StackContainer primary={data.deadline} secondary={tc("deadline")}/>
            <Divider/>
            <Stack className="text-[10px] leading-5 opacity-[40%]" spacing={"0"} direction="column">
                <div>{data.createdAt}</div>
                <div>{data.category}</div>
            </Stack>
            {data.customer && (
                <Stack spacing={"20px"} direction={"column"}>
                    <Typography variant="body2">{tc("customer")}</Typography>
                    <div>
                        <Stack component="div" direction="row" spacing={3}>
                            <UserAvatar height={"80px"} width="80px"/>
                            {/*<Avatar sx={{"height": "80px", width: "80px"}} alt="Avatar" src={data.customer.image}/>*/}
                            <Stack direction={"column"} spacing={"7px"} component={"div"}>
                                <Typography variant="body2">{data.customer.username}</Typography>
                                <Stack component="div" sx={{fontSize: "10px"}} direction="row" spacing="5px">
                                    <div>✅ 2</div>
                                    <div>❎ 1</div>
                                </Stack>
                                <Stack component="div" className="text-[10px]" direction="row" spacing="5px">
                                    <div className="underline text-white opacity-[40%]">
                                        <Link noLinkStyle href={`/profile/${data.customer.id}`}>
                                            {tc("profile")} 📖
                                        </Link>
                                    </div>
                                    <div className="underline text-white opacity-[40%]">
                                        <Link noLinkStyle href={data.customer.telegram}>
                                            Telegram ↗
                                        </Link>
                                    </div>
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
