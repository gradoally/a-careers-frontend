import React from "react";
import {useTranslations} from 'next-intl';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import {NextLinkComposed} from "@/components/Link";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";


export default function NotFound() {
    const trans = useTranslations();
    const header = (
        <AppBar height="60px">
            <Stack direction="row" alignItems="center" spacing={1} >
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>404</Typography>
            </Stack>
        </AppBar>
    )
    return (
        <Shell header={header} footer={<Footer>
            <FooterButton component={NextLinkComposed} to="/">
                {trans("buttons.back")}
            </FooterButton>
        </Footer>}>
                <Stack className="p-5" component="div"
                       direction={"column"} justifyContent="center" alignItems={"center"} sx={{height: "100%"}}>
                    <div style={{
                        fontSize: "128px", lineHeight: "155px",
                    }} className="font-thin">
                        404
                    </div>
                    <Typography variant="body1">
                        {trans("errors.something_went_wrong_sorry")}
                    </Typography>
                </Stack>
        </Shell>
    );
}
