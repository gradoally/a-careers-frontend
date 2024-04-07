import { useTranslations } from "next-intl";

import { TaskFormWrapper } from "@/components/Task/form.component";
import NumberField from "@/components/forms/fields/NumberField";

import { IResponseFormProps } from "../stepper";

export default function Price({ error, formik }: IResponseFormProps) {
    const trans = useTranslations('tasks')
    return (
        <TaskFormWrapper
            title={trans("confirm_the_task_budget")}
            description={trans("or_suggest_your_own")}
        >
            <NumberField
                id="price"
                name="price"
                error={error ? true : false}
                helperText={error}
                placeholder={"0"}
                value={`${formik.values.price}`}
                onChange={formik.handleChange}
            />
        </TaskFormWrapper>
    )
}
