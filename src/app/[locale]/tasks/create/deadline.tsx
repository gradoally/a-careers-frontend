import {useTranslations} from "next-intl";
import {FormikProps} from "formik";

import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import DateTimePicker from "@/components/forms/fields/DateTimePicker";
import {TaskCreateType} from "./stepper";
import Divider from "@/components/ui/Divider";
import {checkError, getError} from "@/lib/helper";


const Deadline = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const trans = useTranslations('tasks')

    return (
        <div className="w-full p-5">
            <Typography variant="h4">{trans("when_should_a_task_be_accomplished")}</Typography>
            <Typography component="div" variant="caption" sx={{marginTop: "10px"}}>
                {trans("specify_the_exact_deadline")}
            </Typography>
            <DateTimePicker

                error={checkError(formik, {}, "deadline")}
                helperText={getError(formik, {}, "deadline")}
                label=""
                className="py-5"
                formControlClassName="mt-6"
                placeholder={trans("deadline_datetime")}
                onChange={(value) => formik.setFieldValue("deadline", value)}
                name="deadline"
                fullWidth id="deadline"
                value={formik.values.deadline}
            />
        </div>
    )
}

export default Deadline;
