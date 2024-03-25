import { useTranslations } from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";

import { IForm } from "../stepper";
import { TaskFormWrapper } from "@/components/Task/form.component";

const TechnicalTask = ({ formik, error }: IForm) => {
    const trans = useTranslations('tasks')
    return (
        <Stack direction="column" className="h-full">
            <TaskFormWrapper
                title={trans("technical_task")}
                description={trans("technical_task_description")}
            />
            <div className="grow">
                <StyledInputMultiline
                    error={error ? true : false}
                    fullWidth
                    inputProps={{ style: { height: "100%", padding: "10px 20px" } }}
                    multiline
                    onChange={formik.handleChange}
                    value={formik.values.technicalTask}
                    id="technicalTask"
                    name="technicalTask" />
            </div>
        </Stack>
    )
}

export default TechnicalTask;