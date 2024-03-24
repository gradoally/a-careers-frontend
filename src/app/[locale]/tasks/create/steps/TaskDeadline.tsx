import { useTranslations } from "next-intl";

import { TaskFormWrapper } from "@/components/Task/form.component";
import DateTimePicker from "@/components/forms/fields/DateTimePicker";

import { checkError, getError } from "@/lib/helper";

import { IForm } from "../stepper";

export default function Deadline({ formik }: IForm) {
    const trans = useTranslations('tasks')
    return (
        <TaskFormWrapper title={trans("when_should_a_task_be_accomplished")} description={trans("specify_the_exact_deadline")}>
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
        </TaskFormWrapper>
    )
}