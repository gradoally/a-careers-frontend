import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Typography } from "@mui/material";
import { toNano } from "@ton/core";

import { useOrderContract } from "@/hooks/useOrderContract";
import useTxChecker from "@/hooks/useTxChecker";

import Footer from "../../../layout/Footer";
import FooterButton, { FooterButton2 } from "../../../ui/buttons/FooterButton";

import {
    IButtonProps,
    IMultipleButtonProps
} from "@/interfaces/taskbuttons";

import { useTask } from "@/lib/provider/task.provider";

import { getOrder } from "@/services/order";
import { toast } from "@/lib/helper";

function SendFeedbackButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            onClick={props.click}
            color={"secondary"}
            variant="contained">
            {props.title}
        </FooterButton>
    </Footer>
}

function OfferResponseButton(props: IMultipleButtonProps) {
    return <Footer>
        <FooterButton2
            color={"secondary"}
            variant="contained"
            onClick={props.button1.click}
        >
            {props.button1.title}
        </FooterButton2>
        <FooterButton
            color={"secondary"}
            variant="contained"
            onClick={props.button2.click}
        >
            {props.button2.title}
        </FooterButton>
        {props.comissionText && <Typography variant="body2">{props.comissionText}</Typography>}
    </Footer>
}

function SubmitResultButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            color={"secondary"}
            variant="contained"
            onClick={props.click}
        >
            {props.title}
        </FooterButton>
    </Footer>
}

function GetPaymentButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            color={"secondary"}
            variant="contained"
            onClick={props.click}
        >
            {props.title}
        </FooterButton>
    </Footer>
}

export default function FreelancerButtons() {
    const locale = useLocale();
    const trans = useTranslations();
    const router = useRouter();

    const { task, info, updateTask } = useTask();
    const { sendAcceptOrder, sendRejectOrder, sendForcePayment } = useOrderContract(task.content?.address || "");

    const { checkTxProgress } = useTxChecker();

    const commissionText = trans("network.commission", { value: "0.011 TON" });
    const index = task.content?.index;

    async function rejectOffer() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendRejectOrder(toNano("0.05"), 0);

            checkTxProgress(async (successCB) => {
                const orderRes = await getOrder({ index, translateTo: locale });
                if (orderRes.data && (orderRes.data.status !== task.content?.status)) {
                    successCB();
                    updateTask(orderRes.data);
                    router.push(`/en/tasks/${index}`)
                }
            });
        } catch (err) {
            toast(trans("errors.something_went_wrong_sorry"), "error");
        }
    }

    async function takeOffer() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendAcceptOrder(toNano("0.05"), 0);

            checkTxProgress(async (successCB) => {
                const orderRes = await getOrder({ index, translateTo: locale });
                if (orderRes.data && (orderRes.data.status !== task.content?.status)) {
                    successCB();
                    updateTask(orderRes.data);
                    router.push(`/en/tasks/${index}`)
                }
            });
        } catch (err) {
            toast(trans("errors.something_went_wrong_sorry"), "error");
        }
    }

    async function getPayment() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendForcePayment(toNano("0.05"), 0);

            checkTxProgress(async (successCB) => {
                const orderRes = await getOrder({ index, translateTo: locale });
                if (orderRes.data && (orderRes.data.status !== task.content?.status)) {
                    successCB();
                    updateTask(orderRes.data);
                    router.push(`/en/tasks/${index}`)
                }
            });
        } catch (err) {
            toast(trans("errors.something_went_wrong_sorry"), "error");
        }
    }

    return (task.content && index !== undefined) ? <Fragment>
        {
            [1, 20].includes(info.statusCode) && <SendFeedbackButton
                title={trans("task.button.send_feedback")}
                click={() => router.push(`${index}/response`)}
            />
        }
        {
            info.statusCode === 2 && <OfferResponseButton
                button1={{
                    title: trans("task.button.reject_offer"),
                    click: rejectOffer
                }}
                button2={{
                    title: trans("task.button.take_the_task"),
                    click: takeOffer
                }}
                comissionText={commissionText}
            />
        }
        {
            info.statusCode === 3 && <SubmitResultButton
                click={() => router.push(`/en/tasks/${index}/submit`)}
                title={trans("task.button.send_result")}
            />
        }
        {
            info.statusCode === 23 && <GetPaymentButton
                click={getPayment}
                title={trans("task.button.get_payment")}
            />
        }
    </Fragment> : <></>
}
