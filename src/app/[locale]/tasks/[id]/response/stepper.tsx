"use client"
import React, { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik, FormikProps } from "formik";
import { z } from "zod";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { toNano } from "@ton/core";

import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import { NextLinkComposed } from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import { checkError, getError } from "@/lib/helper";
import { useAuthContext } from "@/lib/provider/auth.provider";

import { useUserContract } from "@/hooks/useUserContract";

import { ResponseData, buildResponseContent } from '@/contracts/User';

import Deadline from "./step/deadline";
import Price from "./step/price";
import Comment from "./step/comment";

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
    const trans = useTranslations();

    const [step, setStep] = useState<number>(1);
    const [subtitle, setSubtitle] = useState(trans("tasks.first_step"))
    const [title, setTitle] = useState(trans("tasks.make_a_response"));
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useAuthContext();
    const { sendAddResponse } = useUserContract(String(user?.data?.address));

    const schema = z.object({
        price: z.string({ required_error: trans("form.required.default") }),
        deadline: z.date({ required_error: trans("form.required.default") }),
        comment: z.string({ required_error: trans("form.required.default") })
    });

    const formik = useFormik<IResponseField>(
        {
            initialValues: {
                price: "",
                deadline: null,
                comment: ""
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


    async function submitResponse() {
        console.log(`"offer cooperation, order: ${props.id}, price:${formik.values.price}, deadline:${formik.values.deadline}, comment:${formik.values.comment}`);
        const respData: ResponseData = {
            text: formik.values.comment,
            price: toNano(formik.values.price),
            deadline: formik.values.deadline ? new Date(formik.values.deadline).getTime() / 1000 : 0,
        };

        await sendAddResponse("0.2", 0, props.id, buildResponseContent(respData));
    }

    const footer = (
        <Footer>
            {step === 3 ? (
                <>
                    <FooterButton
                        onClick={submitResponse}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"}
                        variant="contained">
                        {trans("response.send_feedback")}
                    </FooterButton>
                    <Typography variant="body2">{trans("network.commission", { value: "0.011 TON" })}</Typography>
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
        <Shell header={header} footer={footer}>
            <MemoizedRenderForm
                step={step}
                formik={formik}
                error={errorMessage} />
        </Shell>
    )
}
