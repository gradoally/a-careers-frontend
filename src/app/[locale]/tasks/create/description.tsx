import {useTranslations} from "next-intl";
import {TaskCreateType} from "./stepper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {StyledInput} from "./styled";
import {FormikProps} from "formik";


const Description = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    return (
        <div className="h-full flex flex-col">
            <Stack className="p-[20px] mb-4" component="div" spacing="20px" direction="column">
                <Typography variant="h4">{t("job_description")}</Typography>
                <Typography variant="caption">
                    {t("add_detailed_description_to_get_more_responses")}
                </Typography>
            </Stack>
            <div className="grow">
                <StyledInput
                    fullWidth
                    multiline
                    onChange={formik.handleChange}
                    inputProps={{style: {height: "100%", padding: "10px 20px 0 20px", overflow: "scroll"}}}
                    id="description"
                    value={formik.values.description}
                    name="description"/>
            </div>
        </div>
    )
}

export default Description;
