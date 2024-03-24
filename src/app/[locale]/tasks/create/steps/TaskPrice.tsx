import { useTranslations } from "next-intl";

import { TaskFormWrapper } from "@/components/Task/form.component";
import NumberField from "@/components/forms/fields/NumberField";
import { checkError, getError } from "@/lib/helper";

import { IForm } from "../stepper";

export default function Price({ formik, error }: IForm) {
    const trans = useTranslations('tasks')
    return (
        <TaskFormWrapper
            title={trans("specify_the_budget_for_the_task")}
            description={trans("set_task_price_explained")}
        >
            <NumberField
                id="price"
                name="price"
                error={error ? true : false}
                helperText={error}
                placeholder={trans("price")}
                value={`${formik.values.price}`}
                onChange={formik.handleChange}
            />
        </TaskFormWrapper>
    )
}