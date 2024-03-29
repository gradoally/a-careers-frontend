import { useTranslations } from "next-intl";

import Footer from "../../layout/Footer";
import FooterButton from "../../ui/buttons/FooterButton";

import { IButtonWrapperProps, IButtonProps } from "@/interfaces/taskbuttons";

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

export default function CustomerButtons(props: IButtonWrapperProps) {
    const trans = useTranslations();

    return <>
        {
            props.order.status === 2 && <ChooseSpecialistButton
                title={trans("task.button.choose_specialist")}
                click={props.clicks && props.clicks[2]}
            />
        }
    </>
}