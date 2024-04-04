import { useTranslations } from "next-intl";

import { Stack, Typography } from "@mui/material";

import AppBar from "@/components/layout/app-bar";
import ProfileView from "@/components/Profile/ProfileView";
import BackButton from "@/components/ui/buttons/BackButton";
import FooterButton from "@/components/ui/buttons/FooterButton";
import Footer from "@/components/layout/Footer";
import Shell from "@/components/layout/Shell";

import { IUser } from "@/interfaces";

export default function FreelancerView(props: {
    freelancer: IUser;
    isCustomer: boolean;
    click?: () => void;
    back: () => void;
}) {
    const trans = useTranslations();

    const header = <AppBar height="60px">
        <Stack direction="row" alignItems="center" spacing={"10px"}>
            <BackButton onClick={props.back} />
            <Typography variant="h5" sx={{ color: "info.main" }}>
                {trans("profile.profile")}
            </Typography>
        </Stack>
        <div className="flex-grow" />
    </AppBar>

    const footer = (
        props.isCustomer ? <Footer>
            <FooterButton
                onClick={props.click}
                color={"secondary"}
                variant="contained"
            >
                {trans("task.button.offer_cooperation")}
            </FooterButton>
        </Footer> : <></>
    )

    return <div
        className="bg-primary z-[500] fixed top-0 left-0 h-full"
    >
        <Shell
            header={header}
            footer={footer}
        >
            <ProfileView data={props.freelancer} publicView={true} />
        </Shell>
    </div>
}