import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import TextField from "@/components/forms/fields/TextField";
import {TaskCreateType} from "./stepper";


const Title = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    return (
        <div className="p-5"  >
            <Typography variant="h4">{t("what_needs_to_be_done")}</Typography>
            <Typography component="div" variant="caption" sx={{marginTop: "10px"}}>{t("job_title")}</Typography>
            <TextField type="text" name="title" onChange={formik.handleChange}
                       value={formik.values.title}
                       helperText={t("task_title_example")}
                       multiline fullWidth id="title" variant="standard"/>
        </div>
    )
}

export default Title;
