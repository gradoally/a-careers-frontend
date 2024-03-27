"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik, FormikProps } from "formik";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { z } from "zod";
import { toNano } from "@ton/core";

import { useAuthContext } from "@/lib/provider/auth.provider";
import { useScreen } from "@/lib/provider/screen.provider";
import { buildOrderContent, OrderContentData } from "@/contracts/Order";
import { useMasterContract } from "@/hooks/useMasterContract";
import { useTonClient } from "@/hooks/useTonClient";
import { useUserContract } from "@/hooks/useUserContract";

import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import { NextLinkComposed } from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import { checkError, getError, toastLoading, toastUpdate } from "@/lib/helper";

import SelectLanguage from "./steps/Language";
import SelectCategory from "./steps/Category";
import Title from "./steps/TaskTitle";
import Deadline from "./steps/TaskDeadline";
import Price from "./steps/TaskPrice";
import Description from "./steps/TaskDescription";
import TechnicalTask from "./steps/TaskTechnicalDescription";
import SelectCheckingPeriod from "./steps/TaskCheckingPeriod";

const keys: Record<number, string> = {
    1: "language",
    2: "category",
    3: "name",
    4: "deadline",
    5: "period",
    6: "price",
    7: "description",
    8: "technicalTask"
}

export interface TaskCreateType {
    language: string;
    category: string;
    period: number;
    price: string;
    deadline: string | null;
    name: string;
    description: string;
    technicalTask: string;
}

export interface IForm {
    formik: FormikProps<TaskCreateType>;
    error?: string
}

export interface ICategoryForm extends IForm {
    setTitle: (text: string) => void;
}

function MemoizedRenderForm(props: {
    step: number;
    formik: FormikProps<TaskCreateType>;
    setTitle: (value: string) => void;
    errorMessage: string;
}) {
    return useMemo(() => {
        return [
            <SelectLanguage key={1} formik={props.formik} />,
            <SelectCategory key={2} setTitle={props.setTitle} formik={props.formik} />,
            <Title key={3} formik={props.formik} error={props.errorMessage} />,
            <Deadline key={4} formik={props.formik} error={props.errorMessage} />,
            <SelectCheckingPeriod key={5} formik={props.formik} />,
            <Price key={6} formik={props.formik} error={props.errorMessage} />,
            <Description key={7} formik={props.formik} error={props.errorMessage} />,
            <TechnicalTask key={8} formik={props.formik} />,
        ][props.step - 1];
    }, [props.step, props.formik]);
}

export default function Stepper() {
    const locale = useLocale();
    const router = useRouter();
    const trans = useTranslations();
    const { user } = useAuthContext();
    const { client } = useTonClient();
    const { toggleTxProgress } = useScreen();

    const {
        sendCreateOrder
    } = useUserContract(String(user?.data?.address));
    const { orderNextIndex } = useMasterContract();

    const [step, setStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [title, setTitle] = useState(trans("tasks.create"))
    const [subtitle, setSubtitle] = useState(trans("tasks.first_step"))
    const [disabled, setDisabled] = useState(false);

    const schema = z.object({
        language: z.string({ required_error: trans("form.required.default") }),
        category: z.string({ required_error: trans("form.required.default") }),
        period: z.string({ required_error: trans("form.required.default") }),
        name: z.string({ required_error: trans("form.required.default") }),
        price: z.string({ required_error: trans("form.required.default") }),
        deadline: z.date({ required_error: trans("form.required.default") }),
        description: z.string({ required_error: trans("form.required.default") }),
        technicalTask: z.string({ required_error: trans("form.required.default") }),
    });

    const handleSubmit = async (values: TaskCreateType) => {
        {
            if (orderNextIndex == null || client == null || user == null) {
                return;
            }
            const toastId = toastLoading(trans("common.please_wait"))

            try {
                const orderContentData: OrderContentData = {
                    category: values.category,
                    language: values.language,
                    name: values.name,
                    description: values.description,
                    technicalTask: values.technicalTask,
                };
                toggleTxProgress(true);
                const orderContentDataCell = buildOrderContent(orderContentData);
                await sendCreateOrder("0.2",
                    0, orderContentDataCell,
                    toNano(values.price),
                    new Date(values.deadline || "date time in ISO").getTime() / 1000,
                    values.period
                );
                toastUpdate(toastId, trans("tasks.task_successfully_created"), 'success');
                router.push(`/${locale}/tasks/${orderNextIndex}`)
            } catch (e) {
                console.log("create_order", e);
                toastUpdate(toastId, trans("errors.something_went_wrong_sorry"), 'warning');
            }
            toggleTxProgress(false);
        }
    }

    const formik = useFormik<TaskCreateType>(
        {
            initialValues: {
                language: locale,
                category: "",
                period: 0,
                price: "",
                deadline: null,
                description: "",
                name: "",
                technicalTask: "",
            },
            initialErrors: {
                category: trans("form.required.default")
            },
            validationSchema: toFormikValidationSchema(schema),
            onSubmit: handleSubmit
        },
    );

    useEffect(() => {
        setSubtitle(trans("tasks.step_x_from_x", { "value": step, "from": 8 }))
    }, [step]);

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

    const Header = (
        <AppBar height="70px">
            <Stack alignItems="center" className="w-full" spacing={2} direction="row">
                {step === 1 ? <div className="h-[30px] w-[30px]" /> : <BackButton onClick={handleBack} />}
                <div className="flex-grow text-center ">
                    <div className="max-w-[200px] mx-auto">
                        <Typography className="truncate !font-InterSemiBold">
                            {title}
                        </Typography>
                        <Typography className="mt-[5px] !font-InterLight" variant="caption" component="div">
                            {subtitle}
                        </Typography>
                    </div>
                </div>
                <CloseButton style={{ marginRight: "1px" }} component={NextLinkComposed} to={"/"} />
            </Stack>
        </AppBar>
    );

    //Footer
    const footer = (<Footer>
        {step === 8 ? (
            <>
                <FooterButton
                    onClick={() => handleSubmit(formik.values)}
                    disabled={disabled}
                    className="w-full"
                    color={"secondary"}
                    variant="contained">
                    {trans("tasks.send_task_to_blockchain")}
                </FooterButton>
                <Typography variant="body2">
                    {trans("network.commission", { value: "0.011 TON" })}
                </Typography>
            </>
        ) : (
            <FooterButton
                style={{
                    opacity: ButtonStatus.disabled ? 0.5 : 1,
                }}
                onClick={handleClick}
                color={"secondary"}
                variant="contained">
                {trans("buttons.next")}
            </FooterButton>
        )}
    </Footer>
    );

    return (
        <Shell header={Header} footer={footer}>
            {<MemoizedRenderForm
                step={step}
                formik={formik}
                setTitle={setTitle}
                errorMessage={errorMessage}
            />}
        </Shell>
    )
}
