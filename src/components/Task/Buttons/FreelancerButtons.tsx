import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Footer from "../../layout/Footer";
import FooterButton from "../../ui/buttons/FooterButton";

import { IButtonWrapperProps, ISendFeedbackButtonProps } from "@/interfaces/taskbuttons";

function SendFeedbackButton(props: ISendFeedbackButtonProps) {
    const router = useRouter();
    return <Footer>
        <FooterButton
            onClick={() => router.push(`${props.index}/response`)}
            color={"secondary"}
            variant="contained">
            {props.title}
        </FooterButton>
    </Footer>
}

export default function FreelancerButtons(props: IButtonWrapperProps) {
    const trans = useTranslations();

    return <>
        <SendFeedbackButton
            title={trans("task.button.send_feedback")}
            index={props.order?.index || -1}
        />
    </>
}