import {useTranslations} from "next-intl";

import Typography  from "@mui/material/Typography";

import TextField from "@/components/forms/fields/TextField";

import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";
import NumberField from "@/components/forms/fields/NumberField";
import {checkError, getError} from "@/lib/helper";

const Price = ({formik}: { formik: FormikProps<TaskCreateType>})=>{
    const t = useTranslations('tasks')

    return (
        <div className="p-5" >
            <Typography variant="h4">{t("specify_the_budget_for_the_task")}</Typography>
            <Typography component="div" variant="caption" sx={{marginTop: "10px"}}>{t("set_task_price_explained")}</Typography>
            <NumberField

                error={checkError(formik, {}, "price")}
                helperText={getError(formik, {}, "price")}
                placeholder={t("price")}
                value={`${formik.values.price}`}
                onChange={formik.handleChange}
                id="price" name="price"
            />
        </div>
    )
}

export default Price;
