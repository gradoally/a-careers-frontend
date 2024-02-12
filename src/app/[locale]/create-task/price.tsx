import {useTranslations} from "next-intl";

import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";


const Price = ({data}: {data: TaskCreateType})=>{
    const t = useTranslations('tasks')
    const handleChange = (event: SelectChangeEvent) => {

    };
    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">Укажите бюджет задачи</Typography>
            <Typography variant="caption">Укажите сумму вознаграждения исполнителю после выполнения задачи в TON</Typography>
            <TextField variant="standard" withDivider fullWidth id="price" name="price" />
        </Stack>
    )
}

export default Price;