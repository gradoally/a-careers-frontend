import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import Typography from "@mui/material/Typography";

import TextField from "@/components/forms/fields/TextField";
import {TaskCreateType} from "./stepper";
import {checkError, getError} from "@/lib/helper";


const Title = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    const helperText = getError(formik, {}, "name")
    return (
        <div className="p-5">
            <Typography variant="h4">{t("what_needs_to_be_done")}</Typography>
            <Typography component="div" variant="caption" sx={{marginTop: "10px"}}>{t("job_title")}</Typography>
            <TextField
                error={checkError(formik, {}, "name")}
                type="text" name="name" onChange={formik.handleChange}
                value={formik.values.name}
                helperText={helperText?helperText:t("task_title_example")}
                multiline fullWidth id="name" variant="standard"/>
        </div>
    )
}

export default Title;
