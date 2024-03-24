import { useTranslations } from "next-intl";

import { useAppContext } from "@/lib/provider/app.providers";

import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

import { TaskFormWrapper } from "@/components/Task/form.component";
import SelectField from "@/components/forms/fields/SelectField";
import Image from "@/components/Image";

import { IForm } from "../stepper";

export default function SelectLanguage({ formik, error }: IForm) {
    const trans = useTranslations();
    const { config } = useAppContext();

    return (
        <TaskFormWrapper
            title={trans("tasks.select_language")}
            description={trans("tasks.language")}
        >
            <SelectField variant="standard"
                error={error ? true : false}
                helperText={error}
                id="language"
                name="language"
                value={formik.values.language}
                SelectProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <div className="h-6 w-6">
                                <Image width="24" height="24" alt="earth" src="/images/earth_americas.png" />
                            </div>
                        </InputAdornment>
                    ),
                }}
                className="!m-0"
                onChange={(e) => formik.setFieldValue("language", e.target.value)}
            >
                {config ? config?.languages?.map((e, i) => {
                    return (
                        <MenuItem className="!capitalize" key={i} value={e.code}>{trans(`locale_switcher.${e.code}`)}</MenuItem>
                    )
                }) : <div />}
            </SelectField>
        </TaskFormWrapper>
    )
}
