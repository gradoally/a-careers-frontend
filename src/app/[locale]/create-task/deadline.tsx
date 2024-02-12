import {useTranslations} from "next-intl";
import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";


const Deadline = ({data}: {data: TaskCreateType})=>{
    const t = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">Когда нужно выполнять задачу?</Typography>
            <Typography variant="caption">
                Укажите точный дедлайн
            </Typography>
            <TextField name="deadline" withDivider fullWidth id="about" variant="standard"/>
        </Stack>
    )
}

export default Deadline;