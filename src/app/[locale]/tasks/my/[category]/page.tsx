import {useTranslations} from "next-intl";

import Shell from "@/components/layout/Shell";
import React, {Suspense} from "react";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";

import {NextLinkComposed} from "@/components/Link";
import TaskList from "@/components/TaskList";
import CenteredContainer from "@/components/ui/CenteredContainer";
import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/config";

type Props = {
    params: {
        locale: string;
    };
};


export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}
const Page = ({params: {locale}}: Props) => {

    // Enable static rendering
    unstable_setRequestLocale(locale);
    const tc = useTranslations("common");
    const t = useTranslations("tasks");
    const data  = [
        {
            "title": "Расширение редактируемого стандарта NFT",
            "date": "12 июня, 9:00 – 3 августа, 21:00",
            "proposals": 1,
            "diamonds": 567,
        },
        {
            "title": "Разработка TDA фриланс-биржи (часть II)",
            "date": "10 июня, 21:00 – 20 июня, 15:00",
            "proposals": 1,
            "diamonds": 777,
        },
        {
            "title": "Заминтить коллекцию тамагочи NFT",
            "date": "10 июня, 21:00 – 20 июня, 15:00",
            "proposals": 0,
            "diamonds": 100500,
        },
        {
            "title": "Extend Editable NFT Standard (add features)",
            "date": "12 июня, 9:00 – 3 августа, 21:00",
            "proposals": 1,
            "diamonds": 567,
        },
    ];

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/tasks/my"}/>
                <Typography
                    variant="h5"
                    sx={{color: "info.main"}}>
                    {t("on_moderation", {value: "777"})}
                </Typography>
            </Stack>
        </AppBar>
    )
    return (
        <Shell   header={header}>
            <div className="p-[20px]">

                <Suspense fallback={<div>Loading...</div>}>
                    {data ? (
                        <TaskList link="/create-profile/category" data={data}/>
                    ) : (
                        <CenteredContainer>
                            {tc("no_more_data")}
                        </CenteredContainer>
                    )}
                </Suspense>
            </div>
        </Shell>
    )
}

export default Page;
