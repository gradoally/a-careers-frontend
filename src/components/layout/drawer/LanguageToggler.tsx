"use client"
import {useLocale, useTranslations} from "next-intl";
import {Typography} from "@mui/material";
import React, {useTransition} from "react";
import {usePathname, useRouter} from "@/navigation";

const LanguageToggler = ()=> {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("locale_switcher")
    const [isPending, startTransition] = useTransition();

    function handleClick() {

        // event.preventDefault();
        startTransition(() => {
            router.replace(pathname, {locale: locale === "ru" ? "en" : "ru"});
        });
    }
    if (isPending) return (
        <Typography component="div" color="text.secondary" variant="body2">...</Typography>
    )
    return (
            <Typography component="div" onClick={()=>handleClick()} sx={{color: "text.secondary"}} variant="body2">
                🌎 {t(locale)}
            </Typography>
    )
}

export default LanguageToggler;