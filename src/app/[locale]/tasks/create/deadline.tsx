import {useTranslations} from "next-intl";
import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import {TaskCreateType} from "./stepper";
import DateTimePicker from "@/components/forms/fields/DateTimePicker";
import {FormikProps} from "formik";


const Deadline = ({formik}: { formik: FormikProps<TaskCreateType>})=>{
    const t = useTranslations('tasks')

    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{t("task_deadline")}</Typography>
            <Typography variant="caption">
                {t("select_deadline")}
            </Typography>
            <DateTimePicker label={t("deadline_datetime")}
                            onChange={(value)=>formik.setFieldValue("deadline", value)}
                            name="deadline" fullWidth id="deadline"
                            value={formik.values.deadline}
            />
        </Stack>
    )
}

export default Deadline;
