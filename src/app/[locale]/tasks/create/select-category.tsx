import {useTranslations} from "next-intl";
import clsx from "clsx";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";
import {useAppContext} from "@/lib/app-providers";


const SelectCategory = ({formik, setTitle}: {  formik: FormikProps<TaskCreateType>, setTitle: (value: string)=>void}) => {
    const trans = useTranslations("tasks")
    const {config} = useAppContext();

    const handleClick = async (value: string) =>{
        await formik.setFieldValue("category", value)
        setTitle(value)
    }

    return (
        <div className={"p-5"}>
            <Typography variant="h4">{trans("select_category")}</Typography>
            <Stack component="div" className="mt-4" spacing="20px">
                {config && config?.categories?.map((e, i) => {
                    if (!e.isActive) return
                    const isSelected = formik.values.category === e.code
                    return (
                        <Button variant="outlined" component="div" color="secondary" key={e?.key}
                                className={"py-[15px] ps-1"}
                                sx={{
                                    borderColor: isSelected ? "common.white" : "secondary.main",
                                    color: isSelected ? "common.white" : "secondary.main"
                                }}
                                onClick={()=>handleClick(e?.code??"")}
                            >
                            <Typography variant="body2" className="w-full leading-[20px]" component="div">
                                {e?.code}
                            </Typography>
                        </Button>
                    )
                })}
            </Stack>
        </div>
    )
}

export default SelectCategory;
