import {useTranslations} from "next-intl";
import clsx from "clsx"
import React from "react";


type StatusType = "declined" | "on_moderation" | "no_responses" | "response_sent"

interface Props {
    status: StatusType
}


const StatusChip = ({status}: Props) => {
    const t = useTranslations("status_chip");

    const data: Record<StatusType, { className: string, text: string, }> = {
        "no_responses": {
            "className": "w-[75px] text-warning border-warning",
            "text": t("no_responses"),
        }, "on_moderation": {
            "className": "w-[75px] text-white border-white",
            "text": t("on_moderation"),
        }, "response_sent": {
            "className": "w-[107px] text-orange border-orange",
            "text": t("response_sent"),
        }, "declined": {
            "className": "w-[75px] text-red border-red",
            "text": t("declined"),
        },
    }


    return (
        <div
            className={
                clsx(
                    "h-[14px] border rounded-[2px] text-[8px] align-middle font-normal",
                    "tracking-wider text-center uppercase leading-3",
                    data[status].className,
                )
            }>
             {data[status].text}
        </div>
    )
}

export default StatusChip;
