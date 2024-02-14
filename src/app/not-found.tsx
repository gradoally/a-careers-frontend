
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import {NextLinkComposed} from "@/components/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

import "./globals.css";
import clsx from "clsx";
import AppProviders from "@/lib/app-providers";
import localFont from "next/font/local";
import type {Metadata} from "next";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";


const inter = localFont({
    src: './fonts/Inter.ttf',
    display: 'swap',
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Alfamater',
    description: 'Ton wallet, Alfamater',
}

const message = {
    "en": {"back": "Back", "message": "Something went wrong. Sorry!"},
    "ru": {"back": "Назад", "message": "Что то пошло не так. Простите!"},
}


export default function NotFound() {
    const locale = "ru"

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>404</Typography>
            </Stack>
        </AppBar>
    )

    return (
        <html lang={locale} className={`${inter.variable}`}>
        <body className={clsx(
            'dark',
        )}>

        <style>{`
            html {
                font-family: ${inter.variable};
            }
        `}</style>
        <AppProviders options={{key: 'mui'}}>
            <Shell miniAppbar header={header} footer={<Footer>
                <FooterButton component={NextLinkComposed} to="/">
                    {message[locale].back}
                </FooterButton>
            </Footer>}>
                <Stack className="p-[20px]" component="div"
                       direction={"column"} justifyContent="center" alignItems={"center"} sx={{height: "100%"}}>
                    <div style={{
                        fontSize: "128px", lineHeight: "155px",
                    }} className="font-thin">
                        404
                    </div>
                    <Typography variant="body1">
                        {message[locale].message}
                    </Typography>
                </Stack>
            </Shell>
        </AppProviders>
        </body>
        </html>
    )
}