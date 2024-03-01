import {useTranslations} from "next-intl";
import {TaskCreateType} from "./stepper";
import Typography from "@mui/material/Typography";
import {FormikProps} from "formik";
import {StyledInputMultiline} from "@/components/forms/fields/StyledInputMultiline";


const Description = ({formik}: { formik: FormikProps<TaskCreateType> }) => {
    const t = useTranslations('tasks')
    return (
        <div className="h-full flex flex-col">
            <div className="p-5 mb-4">
                <Typography variant="h4">{t("job_description")}</Typography>
                <Typography component="div" variant="caption" sx={{marginTop: "10px"}}>
                    {t("add_detailed_description_to_get_more_responses")}
                </Typography>
            </div>
            <div className="grow">
                <StyledInputMultiline
                    fullWidth
                    multiline
                    onChange={formik.handleChange}
                    inputProps={{style: {
                        // height: "100%",
                            // padding: "10px 20px 0",
                            // overflow: "scroll"
                    }}}
                    id="description"
                    value={formik.values.description}
                    name="description"/>
            </div>
        </div>
    )
}

export default Description;
