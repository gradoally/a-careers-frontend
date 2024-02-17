import {useTranslations} from "next-intl";
import Shell from "@/components/layout/Shell";
import React, {Suspense} from "react";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";

import {NextLinkComposed} from "@/components/Link";
import {unstable_setRequestLocale} from "next-intl/server";
import ProfileView from "@/components/ProfileView";
import EditButton from "@/components/ui/buttons/EditButton";

type Props = {
    params: {
        category: string;
        locale: string;
    };
};

const Page = ({params: {locale, category}}: Props) => {

    // Enable static rendering
    unstable_setRequestLocale(locale);
    const t = useTranslations("profile");
    const tc = useTranslations("common");


    const data = {
        username: "@new_user",
        smartContract: "EQCISAJu…W_JqYM3t",
        telegram: "@some_wallet",
        about: "🎯 dApp любой сложности\n" +
            "💎 Премиум дизайн (UI/UX)!\n" +
            "⚙️ Адаптивная верстка – на профессиональном уровне!🏆 Золотой партнёр «1С-Битрикс» (нет) !\n" +
            "\n" +
            "✔️ Blockchain-продвижение сайтов на лидирующие позиции. Взлом рынков, соц. инжинеринг",
        site: "my-little-studio.ton",
        portfolio: "https://github.com/somewallet",
        resume: "https://github.com/somewallet",
        specialization: ["FunC", "FIFT", "Toncenter API"],
        image: "/profile.png",
        history: [
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                title: "Получил входящий арбитраж",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "− 0.011 TON",
            },
            {
                date: "12 янв 2023, 17:00",
                type: "in",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "",
                title: "Создал задачу"
            },
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "",
                title: "Создал задачу"
            },
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "− 0.011 TON",
                title: "Создал задачу"
            },
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "− 0.011 TON",
                title: "Создал задачу"
            },
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "",
                title: "Создал задачу"
            },
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "",
                title: "Создал задачу"
            },
            {
                date: "12 янв 2023, 17:00",
                type: "out",
                smartContract: "EQCISAJu…W_JqYM3t",
                price: "− 0.011 TON",
                title: "Создал задачу"
            },
        ]
    }

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/create-profile"}/>
                <Typography variant="h5" color="info.main">
                    {tc("profile")}
                </Typography>
            </Stack>
            <div className="flex-grow"/>

            <EditButton component={NextLinkComposed} to={"/create-profile/profile/edit"}/>

        </AppBar>
    )
    return (
        <Shell miniAppbar={true} header={header}>
            <Suspense fallback={<div>Loading...</div>}>
                <ProfileView data={data}/>
            </Suspense>
        </Shell>
    )
}

export default Page;