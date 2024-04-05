"use client"
import React, { useEffect, useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik, FormikProps } from "formik";
import { z } from "zod";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Address, toNano } from "@ton/core";

import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import { NextLinkComposed } from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import { checkError, getError } from "@/lib/helper";
import { useAuthContext } from "@/lib/provider/auth.provider";

import { useOrderContract } from "@/hooks/useOrderContract";

import Deadline from "./step/deadline";
import Price from "./step/price";
import Comment from "./step/comment";
import useTxChecker from "@/hooks/useTxChecker";
import { getOrder } from "@/services/order";
import { useTask } from "@/lib/provider/task.provider";
import { useRouter } from "next/navigation";

export interface IResponseFormProps {
    formik: FormikProps<IResponseField>;
    error: string;
}

export interface IResponseField {
    price: string;
    deadline: string | null;
    comment: string;
}

interface IRenderFormProps extends IResponseFormProps {
    step: number;
}

const keys: Record<number, string> = {
    1: "price",
    2: "deadline",
    3: "comment"
}

function MemoizedRenderForm(props: IRenderFormProps) {
    return useMemo(() => {
        return [
            <Price key={1} formik={props.formik} error={props.error} />,
            <Deadline key={2} formik={props.formik} error={props.error} />,
            <Comment key={3} formik={props.formik} error={props.error} />
        ][props.step - 1];
    }, [props.step, props.formik]);
}

export default function Stepper(props: { id: number }) {
    const locale = useLocale();
    const trans = useTranslations();
    const router = useRouter();

    const { user } = useAuthContext();
    const { task, response, updateTask, tabHandler } = useTask();

    const [step, setStep] = useState<number>(1);
    const [subtitle, setSubtitle] = useState(trans("tasks.first_step"))
    const [title] = useState(trans("tasks.commercial_proposal"));
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");;

    const { sendAssignUser } = useOrderContract(String(task.content?.address));
    const { checkTxProgress } = useTxChecker();

    const schema = z.object({
        price: z.string({ required_error: trans("form.required.default") }),
        deadline: z.date({ required_error: trans("form.required.default") }),
        comment: z.string({ required_error: trans("form.required.default") })
    });
    const formik = useFormik<IResponseField>(
        {
            initialValues: {
                price: `${response?.price || ""}`,
                deadline: response?.deadline || null,
                comment: response?.text || ""
            },
            validationSchema: toFormikValidationSchema(schema),
            onSubmit: () => { }
        },
    );

    useEffect(() => {
        if (step == 1) {
            setSubtitle(trans("tasks.first_step"))
        } else {
            setSubtitle(trans("tasks.step_x_from_x", { "value": step, "from": 3 }))
        }
    }, [step])

    useEffect(() => {
        if (checkError(formik, {}, keys[step])) {
            setDisabled(true)
        } else (
            setDisabled(false)
        )
    }, [formik.errors]);

    const ButtonStatus = useMemo(() => {
        const errorMsg = getError(formik, {}, keys[step]);
        return {
            disabled: errorMsg ? true : false,
            error: errorMsg
        }
    }, [formik, step]);

    const handleBack = () => {
        const newStep = step == 1 ? 1 : step - 1
        setStep(newStep)
    }

    const handleClick = () => {
        if (!ButtonStatus.disabled) {
            const newStep = step + 1;
            setStep(newStep);
            setErrorMessage("");
        }
        setErrorMessage(ButtonStatus.error || "");
    }

    async function submitOffer() {
        const price = toNano(formik.values.price);
        const deadline = formik.values.deadline ? new Date(formik.values.deadline).getTime() / 1000 : 0;
        await sendAssignUser(price + toNano("0.1"), 0, price, deadline, Address.parse(response?.freelancerAddress || ""));

        checkTxProgress(async (successCB) => {
            const orderRes = await getOrder({ index: props.id, translateTo: locale, currentUserIndex: user?.data?.index });
            if (orderRes.data && (orderRes.data.status !== task.content?.status)) {
                successCB();
                updateTask(orderRes.data);
                tabHandler.changeTab(0); //reset tab
                router.push(`/en/tasks/${props.id}`)
            }
        });
    }

    const header = (
        <AppBar height="70px">
            <Stack alignItems="center" className="w-full" spacing={2} direction="row">
                {step === 1 ? <div className="h-[30px] w-[30px]" /> : <BackButton onClick={handleBack} />}
                <div className="flex-grow text-center">
                    <Typography variant="body1">
                        {title}
                    </Typography>
                    <Typography className="mt-[5px]" variant="caption" component="div">{subtitle}</Typography>
                </div>
                <CloseButton style={{ marginRight: "5px" }} component={NextLinkComposed} to={`/tasks/${props.id}`} />
            </Stack>
        </AppBar>
    )

    const footer = (
        <Footer>
            {step === 3 ? (
                <>
                    <FooterButton
                        onClick={submitOffer}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"}
                        variant="contained">
                        {trans("task.button.offer_cooperation")}
                    </FooterButton>
                    <Typography variant="body2">{trans("network.frozen", { value: formik.values.price })}</Typography>
                </>
            ) : (
                <FooterButton
                    disabled={disabled}
                    onClick={handleClick}
                    className="w-full"
                    color={"secondary"}
                    variant="contained">
                    {trans("buttons.next")}
                </FooterButton>
            )}
        </Footer>
    )
    return (
        <Shell
            header={header}
            footer={footer}
        >
            <MemoizedRenderForm
                step={step}
                formik={formik}
                error={errorMessage}
            />
        </Shell>
    )
}
