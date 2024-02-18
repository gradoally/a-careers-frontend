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
            <Typography variant="h4">{t("specify_the_budget_for_the_task")}</Typography>
            <Typography variant="caption">{t("set_task_price_explained")}</Typography>
            <TextField type="text" label={t("price")}  value={formik.values.price} onChange={formik.handleChange}
                       variant="standard" withDivider fullWidth id="price" name="price" />
        </Stack>
    )
}

export default Price;
