import { useTranslations } from "next-intl";

import Typography from "@mui/material/Typography";

import { IForm } from "./stepper";
import NumberField from "@/components/forms/fields/NumberField";
import { checkError, getError } from "@/lib/helper";

const Price = ({ formik, error }: IForm) => {
    const trans = useTranslations('tasks')

    return (
        <div className="p-5" >
            <Typography variant="h4">{trans("specify_the_budget_for_the_task")}</Typography>
            <Typography component="div" variant="caption" sx={{ marginTop: "10px" }}>{trans("set_task_price_explained")}</Typography>
            <NumberField
                error={error ? true : false}
                helperText={error}
                placeholder={trans("price")}
                value={`${formik.values.price}`}
                onChange={formik.handleChange}
                id="price" name="price"
            />
        </div>
    )
}

export default Price;
