"use client"
import { useTranslations, useLocale } from "next-intl";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useConfirm } from "material-ui-confirm";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import BaseForm from "@/components/forms/BaseForm";
import TextField from "@/components/forms/fields/TextField";
import AddButton from "@/components/ui/buttons/AddButton";
import SelectField from "@/components/forms/fields/SelectField";
import Image from "@/components/Image";
import { checkError, getError, toastLoading, toastUpdate } from "@/lib/helper";
import { User } from "@/openapi/client";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import React from "react";


const ProfileInput = (
    {
        label, id, name, value, onChange, multiline, helperText, error, readonly
    }: {
        error: boolean;
        helperText?: string;
        label: string;
        name: string;
        id: string;
        value: string;
        onChange: (e: any) => void;
        multiline?: boolean;
        readonly?: boolean
    }
) => {
    return (
        <TextField name={name}
            error={error}
            helperText={helperText}
            type="text"
            label={label}
            InputProps={{ sx: { opacity: "40%", 'fontWeight': "500", 'fontSize': "12px", padding: "10px 0" } }}
            value={value}
            onChange={onChange}
            fullWidth
            id={id}
            multiline={multiline}
            variant="standard"
            readonly={readonly}
        />
    )
}

export interface UserFormValues {
    language: string;
    telegram: string
    nickname: string;
    about: string;
    website: string;
    resume: string;
    portfolio: string;
    specialization: string[];
}

interface Props {
    data?: User;
    onSubmit: (values: UserFormValues, callback: (props: {
        isError: boolean,
        message?: string | null
    }) => Promise<void>) => Promise<void>;
    action: string;
}

const ProfileForm = ({ data, onSubmit, action }: Props) => {
    const locale = useLocale();
    const trans = useTranslations()
    const confirm = useConfirm();

    const schema = z.object({
        language: z.string({ required_error: trans("form.required.default") }),
        telegram: z.string({ required_error: trans("form.required.default") }),
        nickname: z.string({ required_error: trans("form.required.default") }),
        about: z.string({ required_error: trans("form.required.default") }),
        website: z.string().url(trans("form.validation.url")).optional(),
        portfolio: z.string().url(trans("form.validation.url")).optional(),
        resume: z.string().url(trans("form.validation.url")).optional(),
    });

    const formik = useFormik(
        {
            initialValues: {
                language: data?.language ?? locale,
                nickname: data?.nickname ?? "",
                telegram: data?.telegram ?? "",
                about: data?.about ?? "",
                website: data?.website ?? "",
                portfolio: data?.portfolio ?? "",
                resume: data?.resume ?? "",
                specialization: []
            },
            //validationSchema: toFormikValidationSchema(schema),
            onSubmit: (values: UserFormValues) => {
                confirm().then(async () => {
                    const toastId = toastLoading(trans("common.please_wait"))
                    const callback = async (props: { isError: boolean, message?: string | null }) => {
                        if (props.isError) {
                            toastUpdate(toastId, props.message ?? "Failed with error", 'warning');
                        } else {
                            toastUpdate(toastId, props.message ?? "Successfully completed", 'success');
                        }
                    }
                    await onSubmit(values, callback)
                })
            }
        },
    )
    return (
        <BaseForm noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={"30px"} sx={{ marginBottom: "150px" }}>
                <SelectField variant="standard"
                    label={trans("profile.profile_language")}
                    id="language"
                    name="language"
                    value={formik.values.language}
                    SelectProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <div className="h-6 w-6">
                                    <Image width="24" height="24" alt="earth"
                                        src="/images/earth_americas.png" />
                                </div>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => formik.setFieldValue("language", e.target.value)}
                >
                    <MenuItem value={"ru"}>Русский</MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                </SelectField>
                <ProfileInput label="Telegram"
                    error={checkError(formik, {}, "telegram")}
                    helperText={getError(formik, {}, "telegram")}
                    value={formik.values.telegram}
                    id="telegram"
                    name="telegram"
                    onChange={formik.handleChange}
                    readonly={action === "update"}
                />
                <ProfileInput label={trans("profile.nickname")}
                    error={checkError(formik, {}, "nickname")}
                    helperText={getError(formik, {}, "nickname")}
                    value={formik.values.nickname}
                    id="nickname"
                    name="nickname"
                    onChange={formik.handleChange} />
                <ProfileInput label={trans("profile.about")}

                    error={checkError(formik, {}, "about")}
                    helperText={getError(formik, {}, "about")}
                    value={formik.values.about}
                    id="about"
                    name="about"
                    multiline={true}
                    onChange={formik.handleChange} />

                <div>
                    <Typography variant="h4">{trans("profile.freelancer_profile")}</Typography>
                    <Typography sx={{ marginTop: "5px", fontHeight: "20px" }} variant="body2">
                        {trans("profile.fill_if_you_want_make_response")}
                    </Typography>
                </div>

                <ProfileInput label={`${trans("profile.website_link")} (${trans("common.optional")})`}
                    value={formik.values.website}

                    error={checkError(formik, {}, "website")}
                    helperText={getError(formik, {}, "website")}
                    id="website"
                    name="website"
                    multiline={true}
                    onChange={formik.handleChange} />
                <ProfileInput label={`${trans("profile.link_to_portfolio")} (${trans("common.optional")})`}
                    value={formik.values.portfolio}
                    id="link_to_portfolio"
                    error={checkError(formik, {}, "portfolio")}
                    helperText={getError(formik, {}, "portfolio")}
                    name="portfolio"
                    multiline={true}
                    onChange={formik.handleChange} />
                <ProfileInput label={`${trans("profile.resume_link")} (${trans("common.optional")})`}
                    value={formik.values.resume}
                    error={checkError(formik, {}, "resume")}
                    helperText={getError(formik, {}, "resume")}
                    id="resume"
                    name="resume"
                    multiline={true}
                    onChange={formik.handleChange} />

                <div>
                    <Typography variant="caption">{trans("profile.specialization")} ({trans("common.optional")})</Typography>
                    <Stack spacing={1} alignItems="center" direction="row" className="mt-2 py-2">
                        <AddButton />
                        {formik.values?.specialization && formik.values.specialization.map((e: string, i: number) => (
                            <Chip size="small" color="secondary" key={i} label={e} onDelete={() => {
                                console.log(`Delete: ${e}`)
                            }} />
                        ))}
                    </Stack>
                </div>
            </Stack>

            <Footer className="fixed bottom-0 left-0 bg-primary">
                <FooterButton
                    type="submit"
                    className="w-full"
                    color={"secondary"}
                    variant="contained">
                    {trans("profile.send_to_blockchain")}
                </FooterButton>
                <Typography variant="body2">{trans("network.commission", { value: "0.011 TON" })}</Typography>
            </Footer>
        </BaseForm>
    )
}

export default ProfileForm;
