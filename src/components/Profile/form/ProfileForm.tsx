"use client"
import React, { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import { useAppContext } from "@/lib/provider/app.providers";
import { useTelegram } from "@/lib/provider/telegram.provider";
import { checkError, getError, toastLoading, toastUpdate } from "@/lib/helper";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import BaseForm from "@/components/forms/BaseForm";
import TextField from "@/components/forms/fields/TextField";
import AddButton from "@/components/ui/buttons/AddButton";
import SelectField from "@/components/forms/fields/SelectField";
import Image from "@/components/Image";
import { User } from "@/openapi/client";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/buttons/BackButton";
import FooterButton from "@/components/ui/buttons/FooterButton";
import CloseButton from "@/components/ui/buttons/CloseButton";
import { NextLinkComposed } from "@/components/Link";

import CrossIcon from "@/assets/Cross.svg";
import ProfileIcon from "@/assets/gif/unicorn-low.gif";

export function Skill(props: { name: string; remove?: () => void }) {
    return <div className="flex shrink-0 w-auto bg-[#3A4362] font-[400] px-3 py-1 !ml-0 mb-[2px] rounded-[20px]">
        <span className="text-[#FFFFFF] text-[12px] !font-SFProLight !font-[600]">{props.name}</span>
        {props.remove && <Image src={CrossIcon} className="block ml-2" alt="close" onClick={(props.remove)} />}
    </div>
}

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
            InputProps={{
                sx: {
                    opacity: "40%",
                    'fontWeight': "500",
                    'fontSize': "12px",
                    padding: "10px 0"
                }
            }}
            InputLabelProps={{
                sx: {
                    "color": "#ffffff !important"
                }
            }}
            value={value}
            onChange={onChange}
            fullWidth
            id={id}
            multiline={multiline}
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
    title?: string;
    back?: () => void;
}

const ProfileForm = ({ data, onSubmit, action, title, back }: Props) => {

    const locale = useLocale();
    const telegram = useTelegram();
    const trans = useTranslations();
    const { config, getLanguage, isDesktopView } = useAppContext();

    const [skill, setSkill] = useState("");
    const [key, setKey] = useState<string | undefined>("");
    const skillInputRef = useRef<HTMLInputElement>(null);

    const schema = z.object({
        //language: z.string({ required_error: trans("form.required.default") }),
        //telegram: z.string({ required_error: trans("form.required.default") }),
        //nickname: z.string({ required_error: trans("form.required.default") }),
        //about: z.string({ required_error: trans("form.required.default") }),
        website: z.string().url(trans("form.validation.url")).optional(),
        portfolio: z.string().url(trans("form.validation.url")).optional(),
        resume: z.string().url(trans("form.validation.url")).optional(),
    });

    const formik = useFormik(
        {
            initialValues: {
                language: getLanguage(data?.language || "")?.code || locale,
                nickname: data?.nickname ?? "",
                telegram: telegram.user?.username || data?.telegram || "",
                about: data?.about ?? "",
                website: data?.website ?? "",
                portfolio: data?.portfolio ?? "",
                resume: data?.resume ?? "",
                specialization: data?.specialization ? data.specialization.split(",") : []
            },
            validationSchema: toFormikValidationSchema(schema),
            onSubmit: async (values: UserFormValues) => {
                const toastId = toastLoading(trans("common.please_wait"))
                const callback = async (props: { isError: boolean, message?: string | null }) => {
                    if (props.isError) {
                        toastUpdate(toastId, props.message ?? "Failed with error", 'warning');
                    } else {
                        toastUpdate(toastId, props.message ?? "Successfully completed", 'success');
                    }
                }
                await onSubmit(values, callback)
            }
        },
    )

    const setSpecialization = (custom?: string) => {
        const newSkill = skill || custom;
        if (!newSkill) return;
        formik.values.specialization.push(newSkill);
        formik.setFieldValue("specialization", [...formik.values.specialization]);
        setSkill("");
        skillInputRef.current && (skillInputRef.current.focus());
    }

    const removeSpecialization = (index: number) => {
        formik.values.specialization.splice(index, 1);
        formik.setFieldValue("specialization", [...formik.values.specialization]);
    }

    useEffect(() => {
        formik.setFieldValue("telegram", telegram.user?.username || '');
    }, [telegram]);

    useEffect(() => {
        if ((!key || key === "Enter") && skill) {
            setSpecialization();
            setSkill("");
            setKey("Done");
        }
    }, [skill, key]);

    useEffect(() => {
        if (!skillInputRef.current) return;
        function handleClick(e: any) {
            setKey(e.key);
        }
        skillInputRef.current.addEventListener('keydown', handleClick);
        () => {
            if (!skillInputRef.current) return;
            skillInputRef.current.removeEventListener('keydown', handleClick)
        }
    }, []);

    const header = (
        <AppBar height="60px">
            {action === "update" ? <Stack direction="row" alignItems="center" spacing={"10px"}>
                {back && <BackButton onClick={back} />}
                <Typography
                    variant="h5"
                    sx={{ color: "info.main" }}>
                    {title}
                </Typography>
            </Stack> : <Stack style={{ width: "100%" }} direction={"row"} alignContent={"space-between"}>
                <Typography variant="h5" sx={{ color: "info.main", margin: "auto 0" }}>{title}</Typography>
                <CloseButton style={{ marginRight: "5px", marginLeft: "auto" }} component={NextLinkComposed} to={`/`} />
            </Stack>}
        </AppBar>
    )

    const footer = (
        <Footer className="left-0 mt-1 bg-primary">
            <FooterButton
                onClick={() => formik.handleSubmit()}
                className="w-full"
                color={"secondary"}
                variant="contained">
                {trans("profile.send_to_blockchain")}
            </FooterButton>
            <Typography variant="body2">{trans("network.commission", { value: "0.011 TON" })}</Typography>
        </Footer>
    );

    return (<Shell header={header} footer={footer}>
        <div className="p-5">
            <div className="flex justify-center py-[20px]">
                <Image src={ProfileIcon} alt="profile" width={90} height={90} />
            </div>

            <BaseForm noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={"20px"}>
                    <SelectField variant="standard"
                        label={trans("profile.profile_language")}
                        id="language"
                        name="language"
                        value={formik.values.language || locale}
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
                        sxStyles={{
                            "padding": "19px 0"
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
                        readonly={!isDesktopView}
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
                        onChange={formik.handleChange}
                    />
                </Stack>
                <Stack spacing={"20px"}>
                    <div className="!mt-10">
                        <Typography className="!font-SFProSemiBold !font-[800]">{trans("profile.freelancer_profile")}</Typography>
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

                    <div
                        onClick={() => {
                            skillInputRef.current && (skillInputRef.current.focus());
                        }}
                    >
                        <Typography variant="caption">{trans("profile.specialization")} ({trans("common.optional")})</Typography>
                        <Stack spacing={1} alignItems="center" direction="row" className="mt-2 py-2 gap-2 flex-wrap">
                            <AddButton onClick={() => setSpecialization()} />
                            {formik.values?.specialization && formik.values.specialization.map((e: string, i: number) => (
                                <Skill key={i} name={e} remove={() => removeSpecialization(i)} />
                            ))}
                            <div className="flex-1">
                                <input
                                    ref={skillInputRef}
                                    onChange={(event) => setSkill(event.currentTarget.value)}
                                    value={skill}
                                    className="bg-primary flex-shrink outline-none text-grey font-[400]"
                                    autoFocus={true}
                                    list="programmingLanguages"
                                    autoComplete="on"
                                />
                                <datalist id="programmingLanguages" onClick={console.log} className="!my-5 !p-0">
                                    {config?.categories && config.categories.map((cat, indx) => <option
                                        key={indx}
                                        value={cat.code}
                                    >{cat.code}
                                    </option>)}
                                </datalist>
                            </div>
                        </Stack>
                    </div>
                </Stack>
            </BaseForm>
        </div>
    </Shell>)
}

export default ProfileForm;