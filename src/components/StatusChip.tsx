import {useTranslations} from "next-intl";
import clsx from "clsx"
import React from "react";

type StatusType = "declined" | "on_moderation" | "no_responses" | "response_sent"

interface Props {
    status: StatusType
}


const StatusChip = ({status}: Props) => {
    const t = useTranslations("common");

    const data: Record<StatusType, { className: string, text: string, }> = {
        "no_responses": {
            "className": "w-[67px] text-warning border-warning",
            "text": t("no_responses"),
            // "size": "67px",
        }, "on_moderation": {
            "className": "w-[67px] text-white border-white",
            "text": t("on_moderation"),
        }, "response_sent": {
            "className": "w-[107px] text-orange border-orange",
            "text": t("response_sent"),
        }, "declined": {
            "className": "w-[67px] text-red border-red",
            "text": t("declined"),
        },
    }


    return (
        <div
             className={
                 clsx(
                     "h-[14px] border-[0.5px] rounded-[2px] text-[8px] py-[2px] align-middle font-normal",
                     "tracking-wider text-center",
                     data[status].className,

                 )
             }
             style={{
                 // maxWidth: "67px",
                 // color: "warning.main",
                 // height: "14px",
                 // padding: "3px 0 0 3px",
                 // margin: "5px 0",
                 // borderRadius: "2px",
                 // border: "0.5px solid #00FF47",
                 // fontSize: "8px",
                 // fontWeight: 400,
                 lineHeight: "8px",
                 // letterSpacing: "0.06em",
             }}
        >
            {data[status].text}
        </div>
    )
}

export default StatusChip;
