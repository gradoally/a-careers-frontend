import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import InputAdornment from '@mui/material/InputAdornment';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import SelectField from "@/components/forms/fields/SelectField";
import Image from "@/components/Image";
import {TaskCreateType} from "./stepper";

const SelectLanguage = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')

    return (
        <div className="p-5">
            <Typography variant="h4">{t("select_language")}</Typography>
            <Typography variant="caption" component="div" sx={{marginTop: "10px"}}>{t("language")}</Typography>

            <SelectField variant="standard"
                         id="language"
                         name="language"
                         value={formik.values.language}
                         SelectProps={{
                             startAdornment: (
                                 <InputAdornment position="start">
                                     <div className="h-6 w-6">
                                         <Image width="24" height="24" alt="earth" src="/images/earth_americas.png"/>
                                     </div>
                                 </InputAdornment>
                             ),
                         }}
                         onChange={(e) => formik.setFieldValue("language", e.target.value)}
            >
                <MenuItem value={"ru"}>Русский</MenuItem>
                <MenuItem value={"en"}>English</MenuItem>
            </SelectField>
        </div>
    )
}

export default SelectLanguage;
