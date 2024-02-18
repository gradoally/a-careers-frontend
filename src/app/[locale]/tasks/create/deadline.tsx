import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import DateTimePicker from "@/components/forms/fields/DateTimePicker";
import {TaskCreateType} from "./stepper";


const Deadline = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')

    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{t("when_should_a_task_be_accomplished")}</Typography>
            <Typography variant="caption">
                {t("specify_the_exact_deadline")}
            </Typography>
            <DateTimePicker
                label={t("deadline_datetime")}
                onChange={(value) => formik.setFieldValue("deadline", value)}
                name="deadline" fullWidth id="deadline"
                value={formik.values.deadline}
            />
        </Stack>
    )
}

export default Deadline;
