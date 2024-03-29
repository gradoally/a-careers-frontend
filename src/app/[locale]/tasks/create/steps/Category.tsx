import { useTranslations } from "next-intl";

import { useAppContext } from "@/lib/provider/app.providers";

import Stack from "@mui/material/Stack";

import { TaskFormWrapper, Selector } from "@/components/Task/form.component";

import { ICategoryForm } from "../stepper";

export default function SelectCategory({ formik, setTitle }: ICategoryForm) {
    const trans = useTranslations("tasks")
    const { config } = useAppContext();

    const handleClick = async (value: string) => {
        await formik.setFieldValue("category", value)
        setTitle(value)
    }

    return (
        <TaskFormWrapper title={trans("select_category")}>
            <Stack component="div" className="mt-5" spacing="20px">
                {config && config?.categories?.map((e, i) => {
                    if (!e.isActive) return
                    const isSelected = formik.values.category === e.code
                    return <Selector
                        key={i}
                        isSelected={isSelected}
                        select={() => handleClick(e?.code ?? "")}
                        name={e?.code || ""}
                        value={e?.code || ""}
                    />
                })}
            </Stack>
        </TaskFormWrapper>
    )
}
