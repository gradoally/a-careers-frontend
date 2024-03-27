import { useTranslations } from "next-intl";

import DateTimePicker from "@/components/forms/fields/DateTimePicker";
import { TaskFormWrapper } from "@/components/Task/form.component";

import { IResponseFormProps } from "../stepper";

export default function Deadline({ formik, error }: IResponseFormProps) {
    const trans = useTranslations('tasks');
    return (
        <TaskFormWrapper
            title={trans('confirm_the_deadline')}
            description={trans("or_suggest_your_own")}
        >
            <DateTimePicker
                error={error ? true : false}
                helperText={error}
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