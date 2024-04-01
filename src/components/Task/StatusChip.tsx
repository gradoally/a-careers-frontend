import { useTranslations } from "next-intl";
import clsx from "clsx"
import React from "react";

type StatusType = "on_moderation" | "no_responses" | "responses" | "response_sent" | "declined" | "cp_sent" | "in_work" | "deadline_passed" | "awaiting_payment" | "completed"

interface Props {
    status: StatusType | undefined;
    count?: number;
}

export const Statuses: Record<number, StatusType> = {
    0: "on_moderation",
    1: "no_responses",
    2: "cp_sent",
    3: "in_work",
    6: "completed",
    11: "deadline_passed",
    20: "responses",
    21: "response_sent"
}

const StatusChip = ({ status, count }: Props) => {
    const trans = useTranslations("status_chip");

    const data: Record<StatusType, { className: string, text: string, }> = {
        "on_moderation": {
            "className": "text-white border-white",
            "text": trans("on_moderation"),
        },
        "no_responses": {
            "className": "text-warning border-green",
            "text": trans("no_responses"),
        },
        "responses": {
            "className": "text-green border-green",
            "text": trans("responses", { count: count || 0 })
        },
        "response_sent": {
            "className": "text-green border-green",
            "text": trans("response_sent"),
        },
        "declined": {
            "className": "text-light-gray border-light-gray",
            "text": trans("declined"),
        },
        "cp_sent": {
            "className": "text-green border-green",
            "text": trans("cp_sent"),
        },
        "in_work": {
            "className": "border-green text-green",
            "text": trans("in_work")
        },
        "awaiting_payment": {
            "className": "border-red text-red",
            "text": trans("awaiting_payment")
        },
        "deadline_passed": {
            "className": "border-red text-red",
            "text": trans("deadline_passed")
        },
        "completed": {
            "className": "border-red text-red",
            "text": trans("completed")
        },
    }

    return (
        status && <div
            className={
                clsx(
                    "flex w-fit px-1 h-[14px] !border-[0.66px] rounded-[2px] text-[8px] align-middle font-normal leading-none",
                    "tracking-wider text-center uppercase leading-3",
                    data[status].className,
                )
            }>
            <span className="block m-auto leading-none">{data[status].text}</span>
        </div>
    )
}

export default StatusChip;
