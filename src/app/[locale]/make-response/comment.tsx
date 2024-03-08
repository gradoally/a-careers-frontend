import  {useTranslations} from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {TaskCreateType} from "./stepper";
import {StyledInputMultiline} from "@/components/forms/fields/StyledInputMultiline";


const Comment = ({data}: { data: TaskCreateType }) => {
    const trans = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <div className="h-full flex flex-col">
            <Stack className="p-5" component="div" spacing="20px" direction="column">
                <Typography variant="h4">{trans("response_comment")}</Typography>
                <Typography variant="caption">
                    {trans("make_response_comment_description")}
                </Typography>
            </Stack>
            <div className="flex-grow">
                    <StyledInputMultiline
                        fullWidth
                        inputProps={{style: {height: "100%"}}}
                        multiline id="description"
                        value=""
                        name="description"/>

            </div>
        </div>
    )
}

export default Comment;
