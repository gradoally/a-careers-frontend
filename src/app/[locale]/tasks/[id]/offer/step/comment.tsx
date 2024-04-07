import { useTranslations } from "next-intl";

import { TaskFormWrapper } from "@/components/Task/form.component";
import { Typography } from "@mui/material";
import { IResponseFormProps } from "../stepper";


export default function Comment({ formik }: IResponseFormProps) {
    const trans = useTranslations('tasks')

    return (
        <div className="h-full flex flex-col">
            <TaskFormWrapper
                title={trans("make_offer_comment")}
            >
                <span className="block font-SFProLight text-white font-[12px] my-3">💎 {formik.values.price}</span>
                <Typography variant="caption" component="div">How does the reward freeze work?</Typography>
                <Typography variant="caption" component="div" sx={{ color: "white", marginTop: "8px" }}>{`The task smart contract is a commercial offer to the freelancer. You send the amount of remuneration to the task smart contract to confirm your solvency. Before the freelancer accepts the order into work, you can cancel the commercial offer and return the funds at any time. After the freelancer completes the task, you can accept the work and transfer the money from the task smart contract to the freelancer's account, or send the case to the arbitration service.`}</Typography>
            </TaskFormWrapper>
        </div>
    )
}
