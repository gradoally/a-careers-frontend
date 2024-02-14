import {useTranslations} from "next-intl";

import Typography  from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import Divider from "@/components/ui/Divider";
import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";


const Task = ({data}: {data: TaskCreateType})=>{
    const t = useTranslations('tasks')
    const handleChange = (event: SelectChangeEvent) => {

    };
    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">Что нужно сделать?</Typography>
            <Typography variant="caption">Название задания</Typography>
            <TextField  withDivider name="title"
                        multiline fullWidth id="title"  variant="standard"/>
            <Typography variant="caption">Например, создать бот для блокчейн-голосования</Typography>

        </Stack>
    )
}

export default Task;