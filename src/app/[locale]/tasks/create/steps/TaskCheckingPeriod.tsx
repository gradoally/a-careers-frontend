import { useTranslations } from "next-intl";

import { Selector, TaskFormWrapper } from "@/components/Task/form.component";
import Stack from "@mui/material/Stack";

import { IForm } from "../stepper";

export default function SelectCheckingPeriod({ formik }: IForm) {
    const trans = useTranslations("tasks")

    const handleClick = async (value: string) => {
        await formik.setFieldValue("period", value);
    }

    return (
        <TaskFormWrapper
            title={trans("select_checking_period")}
            description={trans("checking_period_description")}
        >
            <Stack component="div" className="mt-4" spacing="20px">
                {["24 hours", "3 days", "10 days", "3 weeks"]?.map((e, i) => {
                    const isSelected = formik.values.period === e;
                    return (
                        <Selector
                            key={i}
                            isSelected={isSelected}
                            select={() => handleClick(e)}
                            name={e}
                            value={e}
                        />
                    )
                })}
            </Stack>
        </TaskFormWrapper>
    )
}
