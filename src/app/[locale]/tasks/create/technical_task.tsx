import {useTranslations} from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";
import {StyledInputMultiline} from "@/components/forms/fields/StyledInputMultiline";


const TechnicalTask = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    return (
        <Stack direction="column" spacing="10px" className="h-full">
            <div className="p-5 mb-4">
                <Typography variant="h4">{t("technical_task")}</Typography>
                <Typography component="div" variant="caption" sx={{marginTop: "10px"}}>
                    {t("technical_task_description")}
                </Typography>
            </div>

            <div className="grow pb-2.5">
                <StyledInputMultiline
                    fullWidth
                    inputProps={{style: {height: "100%", padding: "10px 20px", overflow: "scroll"}}}
                    multiline
                    onChange={formik.handleChange}
                    value={formik.values.technicalTask}
                    id="technicalTask"
                    name="technicalTask"/>
            </div>
        </Stack>
    )
}

export default TechnicalTask;
