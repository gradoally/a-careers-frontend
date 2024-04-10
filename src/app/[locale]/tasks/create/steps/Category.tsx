import { useTranslations } from "next-intl";

import { useAppContext } from "@/lib/provider/app.providers";

import Stack from "@mui/material/Stack";

import { TaskFormWrapper, Selector } from "@/components/Task/form.component";

import { ICategoryForm } from "../stepper";

export default function SelectCategory({ formik, setTitle }: ICategoryForm) {
    const trans = useTranslations()
    const { config } = useAppContext();

    const handleClick = async (value: string) => {
        await formik.setFieldValue("category", value)
        setTitle(trans(`category.${value}`))
    }

    return (
        <TaskFormWrapper title={trans("tasks.select_category")}>
            <Stack component="div" className="mt-5" spacing="20px">
                {config && config?.categories?.map((e, i) => {
                    const isSelected = formik.values.category === e.code
                    return <Selector
                        key={i}
                        isSelected={isSelected}
                        select={() => handleClick(e?.code ?? "")}
                        name={e?.code ? trans(`category.${e.code}`) : ""}
                        value={e?.code || ""}
                    />
                })}
            </Stack>
        </TaskFormWrapper>
    )
}
