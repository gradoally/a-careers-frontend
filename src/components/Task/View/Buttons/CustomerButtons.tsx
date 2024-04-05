import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toNano } from "@ton/core";

import { Typography } from "@mui/material";
import Footer from "../../../layout/Footer";
import FooterButton, { FooterButton2 } from "../../../ui/buttons/FooterButton";

import { useOrderContract } from "@/hooks/useOrderContract";

import useTxChecker from "@/hooks/useTxChecker";

import { useTask } from "@/lib/provider/task.provider";

import { toast } from "@/lib/helper";

import { getOrder } from "@/services/order";

import { IButtonProps, IMultipleButtonProps } from "@/interfaces/taskbuttons";

function ChooseSpecialistButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            onClick={props.click}
            color={"secondary"}
            variant="contained">
            {props.title}
        </FooterButton>
    </Footer>
}

function CancelOfferButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            onClick={props.click}
            color={"secondary"}
            variant="contained"
        >
            {props.title}
        </FooterButton>
        {props.comissionText && <Typography variant="body2">{props.comissionText}</Typography>}
    </Footer>
}

function ReviewResultButton(props: IMultipleButtonProps) {
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

function GetFundBackButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            onClick={props.click}
            color={"secondary"}
            variant="contained"
        >
            {props.title}
        </FooterButton>
        {props.comissionText && <Typography variant="body2">{props.comissionText}</Typography>}
    </Footer>
}

export default function CustomerButtons() {
    const locale = useLocale();
    const trans = useTranslations();
    const router = useRouter();
    const { task, info, updateTask, tabHandler } = useTask();
    const { sendCancelAssign, sendCustomerFeedback, sendRefund } = useOrderContract(task.content?.address || "");
    const { checkTxProgress } = useTxChecker();

    const commissionText = trans("network.commission", { value: "0.011 TON" });

    async function cancelOffer() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendCancelAssign(toNano("0.05"), 0);

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

    async function sendToArbitration() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendCustomerFeedback(toNano("0.05"), 0, true);

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

    async function pay() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendCustomerFeedback(toNano("0.05"), 0, false);

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

    async function getFundBack() {
        try {
            if (!task.content || task.content.index === undefined) return;
            const index = task.content.index;
            await sendRefund(toNano("0.05"), 0);

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

    return <>
        {
            info.statusCode === 20 && <ChooseSpecialistButton
                title={trans("task.button.choose_specialist")}
                click={() => tabHandler.changeTab(1)}
            />
        }
        {
            info.statusCode === 2 && <CancelOfferButton
                title={trans("task.button.cancel_offer")}
                click={cancelOffer}
                comissionText={commissionText}
            />
        }
        {
            info.statusCode === 4 && <ReviewResultButton
                button1={{
                    title: trans('task.button.send_arbitration'),
                    click: sendToArbitration
                }}
                button2={{
                    title: trans('task.button.pay'),
                    click: pay
                }}
                comissionText={commissionText}
            />
        }
        {
            info.statusCode === 11 && <GetFundBackButton
                title={trans('task.button.get_fund')}
                click={getFundBack}
                comissionText={commissionText}
            />
        }
    </>
}
