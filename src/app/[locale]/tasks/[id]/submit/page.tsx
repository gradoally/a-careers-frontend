"use client"

import React, { useEffect, useState, use } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik, FormikProps } from "formik";
import { z } from "zod";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { toNano } from "@ton/core";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";
import { TaskFormWrapper } from "@/components/Task/form.component";
import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import { NextLinkComposed } from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import { checkError, toast } from "@/lib/helper";
import { useAuthContext } from "@/lib/provider/auth.provider";
import { useTask } from "@/lib/provider/task.provider";

import { useOrderContract } from "@/hooks/useOrderContract";
import useTxChecker from "@/hooks/useTxChecker";

import { getOrder } from "@/services/order";
import { maxHeight } from "@mui/system";

export interface IResponseFormProps {
    formik: FormikProps<IResponseField>;
    error: string;
}

export interface IResponseField {
    comment: string;
}

interface Props {
    params: Promise<{
        category: string;
        locale: string;
        id: number;
    }>;
};

export default function Page({ params }: Props) {
    const { id } = use(params);

    const locale = useLocale();
    const trans = useTranslations();
    const router = useRouter();

    const { user } = useAuthContext();
    const { task, updateTask } = useTask();

    const [disabled, setDisabled] = useState(false);

    const { sendCompleteOrder } = useOrderContract(task.content?.address || "");
    const { checkTxProgress } = useTxChecker();

    const schema = z.object({
        comment: z.string({ required_error: trans("form.required.default") })
    });

    const formik = useFormik<IResponseField>(
        {
            initialValues: {
                comment: ""
            },
            validationSchema: toFormikValidationSchema(schema),
            onSubmit: () => { }
        },
    );

    useEffect(() => {
        if (checkError(formik, {}, "comment")) {
            setDisabled(true)
        } else (
            setDisabled(false)
        )
    }, [formik.errors]);

    const handleBack = () => {
        router.push(`/en/tasks/${id}`);
    }

    async function submitResult() {
        alert(`Submit Result! ${formik.values.comment}`);
        const result = formik.values.comment;

        try {
            await sendCompleteOrder(toNano("0.1"), 0, result);

            checkTxProgress(async (successCB) => {
                const orderRes = await getOrder({ index: id, translateTo: locale });
                if (orderRes.data && orderRes.data.currentUserResponse) {
                    successCB();
                    updateTask(orderRes.data);
                    router.push(`/en/tasks/${id}`)
                }
            });
        } catch (err) {
            toast(trans("errors.something_went_wrong_sorry"), "error");
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <AppBar height="70px" sx={{ position: "absolute", top: "0" }}>
                <Stack alignItems="center" className="w-full" spacing={2} direction="row">
                    <BackButton onClick={handleBack} />
                    <div className="flex-grow text-center">
                        <Typography variant="body1">
                            {trans("task.button.send_result")}
                        </Typography>
                    </div>
                    <CloseButton style={{ marginRight: "5px" }} component={NextLinkComposed} to={`/tasks/${id}`} />
                </Stack>
            </AppBar>
            <div className="flex flex-col mt-[70px] h-full !overflow-none">
                <TaskFormWrapper
                    title={trans("tasks.provide_result")}
                    description={trans("tasks.provide_result_description")}
                    descriptionStyles="!mb-0"
                />
                <div style={{
                    backgroundColor: "rgba(43, 43, 60, 0.2)",
                    flex: 1,
                }}>
                    <StyledInputMultiline
                        fullWidth
                        multiline
                        onChange={formik.handleChange}
                        inputProps={{
                            style: {
                                height: "100%",
                                overflowY:"scroll"
                            }
                        }}
                        id="comment"
                        value={formik.values.comment}
                        name="comment"
                    />
                </div>
            </div>
            <Footer className="footer-gradient">
                <>
                    <FooterButton
                        onClick={submitResult}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"}
                        variant="contained">
                        {trans("task.button.submit_result")}
                    </FooterButton>
                    <Typography variant="body2">{trans("network.commission", { value: "0.011 TON" })}</Typography>
                </>
            </Footer>
        </div>
    )
}

