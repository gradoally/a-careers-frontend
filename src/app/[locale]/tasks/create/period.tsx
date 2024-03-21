import { useTranslations } from "next-intl";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { IForm } from "./stepper";

export default function SelectCheckingPeriod({ formik }: IForm) {
    const trans = useTranslations("tasks")

    const handleClick = async (value: string) => {
        await formik.setFieldValue("period", value);
    }

    return (
        <div className={"p-5"}>
            <Typography variant="h4">{trans("select_checking_period")}</Typography>
            <p className="my-4 text-[12px] text-[#FFFFFF] !font-[400]">{trans("checking_period_description")}</p>
            <Stack component="div" className="mt-4" spacing="20px">
                {["24 hours", "3 days", "10 days", "3 weeks"]?.map((e, i) => {
                    const isSelected = formik.values.period === e;
                    return (
                        <Button
                            variant="outlined"
                            component="div"
                            color="secondary"
                            key={i}
                            className={"!py-[15px] !text-[1.2rem]"}
                            sx={{
                                borderColor: isSelected ? "common.white" : "secondary.main",
                                color: isSelected ? "common.white" : "secondary.main"
                            }}
                            onClick={() => handleClick(e)}
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
