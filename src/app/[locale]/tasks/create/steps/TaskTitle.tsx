import { useTranslations } from "next-intl";

import TextField from "@/components/forms/fields/TextField";

import { TaskFormWrapper } from "@/components/Task/form.component";

import { IForm } from "@/app/[locale]/tasks/create/stepper";

export default function Title({ formik, error }: IForm) {
    const trans = useTranslations('tasks');
    return (
        <TaskFormWrapper
            title={trans("what_needs_to_be_done")}
            description={trans("job_title")}
        >
            <TextField
                error={error ? true : false}
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                helperText={error || trans("task_title_example")}
                multiline
                fullWidth
                id="name"
                variant="standard"
            />
        </TaskFormWrapper>
    )
}
