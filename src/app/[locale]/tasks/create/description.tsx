import { useTranslations } from "next-intl";
import Typography from "@mui/material/Typography";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";

import { checkError } from "@/lib/helper";

import { IForm } from "./stepper";

export default function Description({ formik }: IForm) {
    const trans = useTranslations('tasks')
    return (
        <div className="h-full flex flex-col">
            <div className="p-5 mb-4">
                <Typography variant="h4">{trans("job_description")}</Typography>
                <Typography component="div" variant="caption" sx={{ marginTop: "10px" }}>
                    {trans("add_detailed_description_to_get_more_responses")}
                </Typography>
            </div>
            <div className="grow">
                <StyledInputMultiline
                    error={checkError(formik, {}, "description")}
                    fullWidth
                    multiline
                    onChange={formik.handleChange}
                    inputProps={{
                        style: {
                            height: "100%",
                            // padding: "10px 20px 0",
                            // overflow: "scroll"
                        }
                    }}
                    id="description"
                    value={formik.values.description}
                    name="description" />
            </div>
        </div>
    )
}
