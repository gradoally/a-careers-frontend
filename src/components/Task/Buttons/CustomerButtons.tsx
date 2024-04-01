import { useTranslations } from "next-intl";

import { Typography } from "@mui/material";
import Footer from "../../layout/Footer";
import FooterButton from "../../ui/buttons/FooterButton";

import { IButtonWrapperProps, IButtonProps } from "@/interfaces/taskbuttons";
import { useOrderContract } from "@/hooks/useOrderContract";
import { Address, toNano } from "@ton/core";

function ChooseSpecialistButton(props: IButtonProps) {
    return <Footer>
        <FooterButton
            onClick={props.click}
            color={"secondary"}
            variant="contained">
            {props.title}
        </FooterButton>
    </Footer>
}

function CancelOfferButton(props: IButtonProps) {

    return <Footer>
        <FooterButton
            color={"secondary"}
            variant="contained">
            {props.title}
        </FooterButton>
        {props.comissionText && <Typography variant="body2">{props.comissionText}</Typography>}
    </Footer>
}

export default function CustomerButtons(props: IButtonWrapperProps) {
    const trans = useTranslations();
    const commissionText = trans("network.commission", { value: "0.011 TON" });

    const { sendCancelAssign } = useOrderContract(props.order.address || "");
    
    async function cancelOffer() {
        alert("Cancel offer");
        await sendCancelAssign(toNano("0.1"), 0);
    }

    return <>
        {
            props.statusCode === 2 && <CancelOfferButton
                click={cancelOffer}
                title={trans("task.button.cancel_offer")}
                comissionText={commissionText}
            />}
        {
            props.statusCode === 20 && <ChooseSpecialistButton
                title={trans("task.button.choose_specialist")}
                click={props.clicks && props.clicks[20]}
            />
        }
    </>
}
