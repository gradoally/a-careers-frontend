import {useTranslations} from "next-intl";
import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";
import DateTimePicker from "@/components/forms/fields/DateTimePicker";


const Deadline = ({data}: {data: TaskCreateType})=>{
    const trans = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <Stack className="p-5" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{trans('confirm_the_deadline')}</Typography>

            <Typography variant="caption">{trans("or_suggest_your_own")}</Typography>

            <DateTimePicker
                placeholder={trans("deadline_datetime")}
                onChange={(value) => {}}
                name="deadline" fullWidth id="deadline"
                value={null}
            />

        </Stack>
    )
}

export default Deadline;