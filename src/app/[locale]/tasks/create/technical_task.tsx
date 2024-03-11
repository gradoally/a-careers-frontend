import { useTranslations } from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";

import { IForm } from "./stepper";

const TechnicalTask = ({ formik, error }: IForm) => {
    const trans = useTranslations('tasks')
    return (
        <Stack direction="column" spacing="10px" className="h-full">
            <div className="p-5 mb-4">
                <Typography variant="h4">{trans("technical_task")}</Typography>
                <Typography component="div" variant="caption" sx={{ marginTop: "10px" }}>
                    {trans("technical_task_description")}
                </Typography>
            </div>

            <div className="grow pb-2.5">
                <StyledInputMultiline
                    error={error ? true : false}
                    fullWidth
                    inputProps={{ style: { height: "100%", padding: "10px 20px", overflow: "scroll" } }}
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
