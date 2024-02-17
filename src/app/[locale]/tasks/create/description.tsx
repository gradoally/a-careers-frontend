import {useTranslations} from "next-intl";
import {TaskCreateType} from "./stepper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {StyledInput} from "./styled";
import {FormikProps} from "formik";


const Description = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    return (
        <div className="min-h-screen h-full flex flex-col">
            <Stack className="p-[20px] mb-4" component="div" spacing="20px" direction="column">
                <Typography variant="h4">Описание задания</Typography>
                <Typography variant="caption">
                    {t("add_detailed_description_to_get_more_responses")}
                </Typography>
            </Stack>
            <div className="grow">
                    <StyledInput
                        fullWidth
                        multiline
                        onChange={formik.handleChange}
                        inputProps={{style: {height: "100%"}}}
                        id="description"
                        value={formik.values.description}
                        name="description"/>
            </div>
        </div>
    )
}

export default Description;
