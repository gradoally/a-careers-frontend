import {useTranslations} from "next-intl";

import Typography  from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";


const Price = ({formik}: { formik: FormikProps<TaskCreateType>})=>{
    const t = useTranslations('tasks')

    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{t("set_task_price")}</Typography>
            <Typography variant="caption">{t("set_task_price_explained")}</Typography>
            <TextField type="text"  value={formik.values.price} onChange={formik.handleChange}
                       variant="standard" withDivider fullWidth id="price" name="price" />
        </Stack>
    )
}

export default Price;
