"use client"

import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import {NextLinkComposed} from "@/components/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import {parseCookies} from "nookies";
import {DEFAULT_LOCALE} from "@/lib/constants";
import {locales} from "@/config";
// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.


export default function NotFound() {
    // const cookies = parseCookies();
    // let locale = cookies["NEXT_LOCALE"]
    let locale = "ru";
    // // @ts-ignore
    // if (!locales.includes(locale)) locale = DEFAULT_LOCALE;

    const messages = {
        "ru": {
            "back": "Назад",
            "message": "Что то пошло не так. Простите!"
        },
        "en": {
            "back": "Back",
            "message": "Something went wrong. Sorry!",
        }
    }
    return (
        <html lang={locale}>
        <body>
            <Shell footer={<Footer>
                <FooterButton component={NextLinkComposed} to="/">
                    {messages[locale as typeof locales[number]].back}
                </FooterButton>
            </Footer>}>
                <Stack direction={"column"} spacing={2}>
                    <Typography sx={{fontSize: "128px", fontWeight: 100}}>404</Typography>
                    <Typography variant="body1">
                        {messages[locale as typeof locales[number]].message}
                    </Typography>
                </Stack>
            </Shell>
        </body>
        </html>
    );
}