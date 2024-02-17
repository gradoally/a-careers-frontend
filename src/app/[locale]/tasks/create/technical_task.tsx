import {useTranslations} from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {StyledInput} from "./styled";
import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";


const TechnicalTask = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <div className="h-full flex flex-col">
            <Stack className="p-[20px] mb-4" component="div" spacing="20px" direction="column">
                <Typography variant="h4">{t("technical_task")}</Typography>
                <Typography component="div" variant="caption">
                    {t("technical_task_description")}
                </Typography>
            </Stack>

            <div className="flex-grow">
                <StyledInput
                    fullWidth
                    inputProps={{style: {height: "100%"}}}
                    multiline

                    value={formik.values.technicalTask}
                    id="technical_task"
                    name="technical_task"/>
            </div>
        </div>
    )
}

export default TechnicalTask;
