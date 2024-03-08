import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import InputAdornment from '@mui/material/InputAdornment';
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';

import SelectField from "@/components/forms/fields/SelectField";
import Image from "@/components/Image";
import {TaskCreateType} from "./stepper";
import {useAppContext} from "@/lib/app-providers";
import {checkError, getError} from "@/lib/helper";


const SelectLanguage = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const trans = useTranslations('tasks')
    const tl = useTranslations('locale_switcher')
    const {config} = useAppContext();
    return (
        <div className="p-5">
            <Typography variant="h4">{trans("select_language")}</Typography>
            <Typography variant="caption" component="div" sx={{marginTop: "10px"}}>{trans("language")}</Typography>

            <SelectField variant="standard"
                         error={checkError(formik, {}, "language")}
                         helperText={getError(formik, {}, "language")}
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
                {config?config?.languages?.map((e,i)=>{
                    return (
                        <MenuItem key={i} value={e.code}>{tl(e.code)}</MenuItem>
                    )
                }):<div/> }
            </SelectField>
        </div>
    )
}

export default SelectLanguage;
