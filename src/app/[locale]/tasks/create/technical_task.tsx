import {useTranslations} from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {StyledInput} from "./styled";
import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";


const TechnicalTask = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    return (
        <Stack direction="column" spacing="10px" className="h-full">
            <Stack className="p-[20px] mb-4" component="div" spacing="20px" direction="column">
                <Typography variant="h4">{t("technical_task")}</Typography>
                <Typography component="div" variant="caption">
                    {t("technical_task_description")}
                </Typography>
            </Stack>

            <div className="grow pb-2.5">
                <StyledInput
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
