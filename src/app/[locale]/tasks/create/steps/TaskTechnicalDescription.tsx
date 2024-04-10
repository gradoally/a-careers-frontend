import { useTranslations } from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";

import { IForm } from "../stepper";
import { TaskFormWrapper } from "@/components/Task/form.component";

const TechnicalTask = ({ formik, error }: IForm) => {
    const trans = useTranslations('tasks')
    return (
        <Stack direction="column" className="h-full pb-1">
            <TaskFormWrapper
                title={trans("technical_task")}
                description={trans("technical_task_description")}
            />
            <StyledInputMultiline
                error={error ? true : false}
                fullWidth
                inputProps={{ style: { height: "98%" } }}
                multiline
                onChange={formik.handleChange}
                value={formik.values.technicalTask}
                id="technicalTask"
                name="technicalTask" />
        </Stack>
    )
}

export default TechnicalTask;
