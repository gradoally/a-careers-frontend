"use client"
import {useTranslations} from "next-intl";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {useFormik} from "formik";


import BaseForm from "@/components/forms/BaseForm";
import TextField from "@/components/forms/fields/TextField";
import Divider from "@/components/ui/Divider";
import AddButton from "@/components/ui/buttons/AddButton";
import {User} from "@/openapi/client";


const ProfileForm = ({data}: { data?: User }) => {
    const t = useTranslations("profile")
    const tc = useTranslations("common")

    const formik = useFormik(
        {
            initialValues: {
                nickname: data?.nickname ?? "",
                telegram: data?.telegram ?? "",
                about: data?.about ?? "",
                website: data?.website ??"",
                portfolio: data?.portfolio??"",
                resume: data?.resume ??"",
                specialization: []
            },
            onSubmit: (values: any) => {
            }
        },
    )
    return (
        <BaseForm noValidate>
            <Stack spacing={"30px"}>
                <Typography className="">Telegram</Typography>
                <div>
                    <TextField name="nickname" type="text"
                               value={formik.values.nickname} onChange={formik.handleChange}
                               fullWidth id="nickname" label={t("nickname")}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <TextField
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.telegram}
                        fullWidth id="telegram"
                        name="telegram"
                        label="Telegram"
                        variant="standard"/>
                    <Divider/>
                </div>
                <div>

                    <TextField
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.about }
                               multiline
                        fullWidth
                        id="about"
                        name="about" label={t("about")}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <Typography variant="h4">{t("freelancer_profile")}</Typography>
                    <Typography className="mt-[5px]" variant="body2">
                        {t("fill_if_you_want_make_response")}
                    </Typography>
                </div>
                <div>
                    <TextField value={formik.values.website } fullWidth id="website"
                               type="text" onChange={formik.handleChange}
                               name="website"
                               label={`${t("link_to_website")} ${tc("optional")}`}

                               variant="standard"/>
                    <Divider/>
                </div>
                <div>

                    <TextField value={formik.values.portfolio} type="text" onChange={formik.handleChange}
                               fullWidth id="link_to_portfolio"
                               name="link_to_portfolio"
                               label={`${t("link_to_portfolio")} ${tc("optional")}`}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <TextField name="resume" value={formik.values.resume} type="text" onChange={formik.handleChange}
                               fullWidth id="resume"
                               label={`${t("resume")}
                                ${tc("optional")}`}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <Typography variant="caption">{t("specialization")} {tc("optional")}</Typography>
                    <Stack spacing={1} alignItems="center" direction="row" className="mt-2 py-2">
                        <AddButton/>
                        {formik.values?.specialization && formik.values.specialization.map((e: string, i: number) => (
                            <Chip size="small" color="secondary" key={i} label={e} onDelete={() => {
                                console.log(`Delete: ${e}`)
                            }}/>
                        ))}
                    </Stack>
                </div>
            </Stack>
        </BaseForm>
    )
}

export default ProfileForm;
