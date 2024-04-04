import { useTranslations } from "next-intl";

import { StyledInputMultiline } from "@/components/forms/fields/StyledInputMultiline";
import { TaskFormWrapper } from "@/components/Task/form.component";

import { IResponseFormProps } from "../stepper";

export default function Comment({ formik, error }: IResponseFormProps) {
    const trans = useTranslations('tasks')

    return (
        <div className="h-full flex flex-col">
            <TaskFormWrapper
                title={trans("response_comment")}
                description={trans("make_response_comment_description")}
                descriptionStyles="!mb-0"
            />
            <div className="flex-grow">
                <StyledInputMultiline
                    error={error ? true : false}
                    fullWidth
                    multiline
                    onChange={formik.handleChange}
                    inputProps={{
                        style: {
                            height: "100%",
                        }
                    }}
                    id="comment"
                    value={formik.values.comment}
                    name="comment"
                />
            </div>
        </div>
    )
}
