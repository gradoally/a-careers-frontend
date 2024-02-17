import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";


const Title = ({formik}: {formik: FormikProps<TaskCreateType>})=>{
    const t = useTranslations('tasks')
    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{t("what_need_to_do")}</Typography>
            <Typography variant="caption">{t("task_name")}</Typography>
            <TextField type="text" withDivider name="title" onChange={formik.handleChange}
                       value={formik.values.title}
                        multiline fullWidth id="title"  variant="standard"/>
            <Typography variant="caption">{t("task_title_example")}</Typography>

        </Stack>
    )
}

export default Title;