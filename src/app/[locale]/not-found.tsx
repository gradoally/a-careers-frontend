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
    const t = useTranslations();

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={1} >
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>404</Typography>
            </Stack>
        </AppBar>
    )
    return (
        <Shell header={header} footer={<Footer>
            <FooterButton component={NextLinkComposed} to="/">
                {t("common.back")}
            </FooterButton>
        </Footer>}>
                <Stack direction={"column"} justifyContent="center" alignItems={"center"} sx={{height: "100%"}}>
                    <p style={{
                        fontSize: "128px", lineHeight: "155px", letterSpacing: "0em", fontWeight: 100
                    }}>
                        404
                    </p>
                    <Typography variant="body1">
                        {t("errors.something_went_wrong_sorry")}
                    </Typography>
                </Stack>
        </Shell>
    );
}