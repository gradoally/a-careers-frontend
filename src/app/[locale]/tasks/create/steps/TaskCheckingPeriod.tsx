import { useTranslations } from "next-intl";

import { Selector, TaskFormWrapper } from "@/components/Task/form.component";
import Stack from "@mui/material/Stack";

import { IForm } from "../stepper";

const periodList = [
    { label: '24 hours', value: 86400 },
    { label: '3 days', value: 259200 },
    { label: '10 days', value: 864000 },
    { label: '3 weeks', value: 1814400 },
];

export default function SelectCheckingPeriod({ formik }: IForm) {
    const trans = useTranslations("tasks")

    const handleClick = async (value: number) => {
        await formik.setFieldValue("period", value);
    }

    return (
        <TaskFormWrapper
            title={trans("select_checking_period")}
            description={trans("checking_period_description")}
        >
            <Stack component="div" className="mt-4" spacing="20px">
                {periodList.map((e, i) => {
                        const isSelected = formik.values.period === e.value;
                        return (
                            <Selector
                                key={i}
                                isSelected={isSelected}
                                select={() => handleClick(e.value)}
                                name={e.label}
                                value={e.value + ""}
                            />
                        )
                    })}
            </Stack>
        </TaskFormWrapper>
    )
}
