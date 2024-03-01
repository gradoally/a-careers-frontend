import {useTranslations} from "next-intl";
import clsx from "clsx";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {TaskCreateType} from "./stepper";
import {FormikProps} from "formik";


const SelectCategory = ({formik, setTitle}: {  formik: FormikProps<TaskCreateType>, setTitle: (value: string)=>void}) => {
    const t = useTranslations("tasks")

    const category: string[] = [
        "Проект под ключ",
        "Разработка смарт-контрактов",
        "Разработка Telegram-ботов и Telegram Web App",
        "Создание сайтов и TON Sites",
        "Backend и взаимодействие с блокчейном",
        "UX/UI дизайн, графический дизайн, 3D",
        "Frontend-разработка",
        "Разработка и минт NFT-коллекций",
    ]

    const handleClick = async (value: string) =>{
        await formik.setFieldValue("category", value)
        setTitle(value)
    }

    return (
        <div className={"p-5"}>
            <Typography variant="h4">{t("select_category")}</Typography>
            <Stack component="div" className="mt-4" spacing="20px">
                {category.map((e, i) => {
                    const isSelected = formik.values.category === e
                    return (
                        <Button variant="outlined" component="div" color="secondary" key={i}
                                className={"py-[15px] ps-1"}
                                sx={{
                                    borderColor: isSelected ? "common.white" : "secondary.main",
                                    color: isSelected ? "common.white" : "secondary.main"
                                }}
                                onClick={()=>handleClick(e)}
                            >
                            <Typography variant="body2" className="w-full leading-[20px]" component="div">
                                {e}
                            </Typography>
                        </Button>
                    )
                })}
            </Stack>
        </div>
    )
}

export default SelectCategory;
