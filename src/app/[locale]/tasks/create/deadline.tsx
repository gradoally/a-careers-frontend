import {useTranslations} from "next-intl";
import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";
import DateTimePicker from "@/components/forms/fields/DateTimePicker";


const Deadline = ({data}: {data: TaskCreateType})=>{
    const t = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">Когда нужно выполнять задачу?</Typography>
            <Typography variant="caption">
                {t("select_deadline")}
            </Typography>
            <DateTimePicker label={t("deadline_datetime")}  name="deadline" fullWidth id="about" variant="standard"/>
        </Stack>
    )
}

export default Deadline;