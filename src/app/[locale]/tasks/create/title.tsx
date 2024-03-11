import { useTranslations } from "next-intl";
import { FormikProps } from "formik";

import Typography from "@mui/material/Typography";

import TextField from "@/components/forms/fields/TextField";
import { IForm } from "@/app/[locale]/tasks/create/stepper";

export default function Title({ formik, error }: IForm) {
    const trans = useTranslations('tasks')
    return (
        <div className="p-5">
            <Typography variant="h4">{trans("what_needs_to_be_done")}</Typography>
            <Typography component="div" variant="caption" sx={{ marginTop: "10px" }}>{trans("job_title")}</Typography>
            <TextField
                error={error ? true : false}
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                helperText={error || trans("task_title_example")}
                multiline fullWidth id="name" variant="standard"
            />
        </div>
    )
}
