import { useTranslations } from "next-intl";
import clsx from "clsx"
import React, { useMemo } from "react";

type StatusType =
    "on_moderation" |
    "no_responses" |
    "responses" |
    "response_sent" |
    "refusal" |
    "cp_sent" |
    "in_work" |
    "deadline_passed" |
    "awaiting_payment" |
    "on_check" |
    "in_arbitration" |
    "completed" |
    "offer_received" |
    "result_ignored"

interface Props {
    statusCode: number;
    count?: number;
    isCustomer: boolean;
}

interface IStatus {
    "customer": Record<number, StatusType>;
    "freelancer": Record<number, StatusType>;
}

const statuses: IStatus = {
    "customer": {
        0: "on_moderation",
        1: "no_responses",
        2: "cp_sent",
        3: "in_work",
        4: "awaiting_payment",
        6: "completed",
        9: "in_arbitration",
        11: "deadline_passed",
        20: "responses",
    },
    "freelancer": {
        1: "no_responses",
        2: "offer_received",
        3: "in_work",
        4: "on_check",
        6: "completed",
        9: "in_arbitration",
        20: "responses",
        21: "response_sent",
        22: "refusal",
        23: "result_ignored"
    }
}

function getStatus(statusCode: number, isCustomer: boolean): StatusType {
    const user = isCustomer ? "customer" : "freelancer";
    const statusLists = statuses[user];
    return statusLists[statusCode];
}

function StatusChip({ statusCode, count, isCustomer }: Props) {
    
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
        "cp_sent": {
            "className": "text-green border-green",
            "text": trans("cp_sent"),
        },
        "refusal": {
            "className": "text-light-gray border-light-gray",
            "text": trans("refusal"),
        },
        "in_work": {
            "className": isCustomer ? "border-green text-green" : "border-orange text-orange",
            "text": trans("in_work")
        },
        "on_check": {
            "className": "border-orange text-orange",
            "text": trans("on_check")
        },
        "awaiting_payment": {
            "className": "border-yellow text-yellow",
            "text": trans("awaiting_payment")
        },
        "in_arbitration": {
            "className": "border-red text-red",
            "text": trans("in_arbitration")
        },
        "deadline_passed": {
            "className": "border-red text-red",
            "text": trans("deadline_passed")
        },
        "result_ignored": {
            "className": "border-orange text-orange",
            "text": trans("result_ignored")
        },
        "completed": {
            "className": "border-green text-green",
            "text": trans("completed")
        },
        "offer_received": {
            "className": "border-green text-green",
            "text": trans("offer_received")
        }
    }

    const status: StatusType = useMemo(() => getStatus(statusCode, isCustomer), [isCustomer, statusCode]);

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
