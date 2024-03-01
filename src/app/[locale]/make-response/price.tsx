import {useTranslations} from "next-intl";
import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";
import NumberFormat from "@/components/forms/fields/NumberFormat";


const Price = ({data}: {data: TaskCreateType})=>{
    const t = useTranslations('tasks')
    return (
        <Stack className="p-5" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{t("confirm_the_task_budget")}</Typography>
            <Typography variant="caption">{t("or_suggest_your_own")}</Typography>
            <TextField  onChange={()=>{}}  type="text"
                        label={t("price")}
                        // InputProps={{
                        //     disableUnderline: true,
                        //     inputComponent: NumberFormat as any,
                        //     inputProps: {
                        //         min: 0,
                        //     },
                        // }}
                        value="" variant="standard" fullWidth id="price" name="price" />
        </Stack>
    )
}

export default Price;
