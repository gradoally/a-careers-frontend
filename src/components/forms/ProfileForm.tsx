"use client"
import {useTranslations} from "next-intl";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';


import BaseForm from "@/components/forms/BaseForm";
import TextField from "@/components/forms/fields/TextField";
import Divider from "@/components/ui/Divider";
import AddButton from "@/components/ui/buttons/AddButton";

interface ProfileData {
    username: string
    smartContract: string;
    telegram: string;
    about?: string;
    site?: string
    portfolio?: string;
    resume?: string;
    specialization?: string[]
}

const ProfileForm = ({data}: { data?: ProfileData}) => {
    const t = useTranslations("profile")
    const tc = useTranslations("common")


    return (
        <BaseForm noValidate>
            <Stack spacing={"30px"}>
                <Typography className="">Telegram</Typography>
                <div>
                    <TextField name="nickname" value={data?.username} fullWidth id="nickname" label={t("nickname")}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <TextField value={data?.telegram} fullWidth id="telegram" name="telegram" label="Telegram"
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>

                    <TextField value={data?.about} multiline fullWidth id="about" name="about" label={t("about")}
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
                    <TextField value={data?.site} fullWidth id="link_to_website"
                               name="lint_to_website"
                               label={`${t("link_to_website")} ${tc("optional")}`}

                               variant="standard"/>
                    <Divider/>
                </div>
                <div>

                    <TextField value={data?.portfolio} fullWidth id="link_to_portfolio"
                               name="link_to_portfolio"
                               label={`${t("link_to_portfolio")} ${tc("optional")}`}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <TextField name="resume" value={data?.resume} fullWidth id="resume"
                               label={`${t("resume")} ${tc("optional")}`}
                               variant="standard"/>
                    <Divider/>
                </div>
                <div>
                    <Typography variant="caption">{t("specialization")} {tc("optional")}</Typography>
                    <Stack spacing={1} alignItems="center" direction="row" className="mt-2 py-2">
                        <AddButton/>
                        {data?.specialization && data.specialization.map((e, i) => (
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