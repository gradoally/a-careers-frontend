import React from "react";
import {useTranslations} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import TaskView from "@/components/TaskView";
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import MenuButton from "@/components/ui/buttons/MenuButton";
import {locales} from "@/config";
import Link, {NextLinkComposed} from "@/components/Link";

type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props)=>{
    unstable_setRequestLocale(locale);

    const tc = useTranslations("common");
    const t = useTranslations("tasks");
    const data = {
        "title": "Доработать мета-данные и память смарт-контракта",
        "diamonds": 1225,
        "proposals": 0,
        "language": {"label": "Русский"},
        "description": "Необходимо доработать смарт-контракт таким образом, что бы при деплое он хранил ссылку на одни метаданные, а после передачи собственности с кошелька владельца метаданные менялись на другие. Изначально элементы коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи на маркетплейсе у владельца должен появиться.",
        "technicalTask": "Необходимо доработать смарт-контракт таким образом, что бы при деплое он хранил ссылку на одни метаданные, а после передачи собственности с кошелька владельца метаданные менялись на другие. Изначально элементы коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи на маркетплейсе у владельца должен появиться.",
        "deadline": "21 июня, 21:00",
        "createdAt": "Создано 7 июня в 16:53 на русском языке",
        "category": "Категория «Разработка на блокчейне TON»",
        "status": "response_sent" as "response_sent",

        "customer": {
            "id": 1,
            "image": "/avatar.png",
            "username": "@another_kote",
            "telegram": "@another_kote"
        },
    }

    const footer = (
        <Footer>
            <FooterButton
                color={"secondary"} sx={{color: "common.black", width: "100%"}}
                variant="contained">
                {tc("log_in_and_respond")}
            </FooterButton>
        </Footer>
    )
    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/make-response"}/>
                <Typography variant="h5" sx={{color: "info.main"}}>
                    {t("detail", {value: "#234567"})}
                </Typography>
            </Stack>

            <div className="grow"/>
            <Typography component="div" color="info.main" variant="body2">
                <Link noLinkStyle href={"/make-response/declined"}>Declined</Link>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={"15px"}>
                <Avatar alt="Diamond"
                        src="/diamond.png"
                        sx={{height: '30px', width: "30px"}}
                />
                <MenuButton/>
            </Stack>
        </AppBar>
    )

    return (

        <Shell   header={header} footer={footer} withDrawer>

            <Stack
                className="p-[20px]"
                component="div"
                direction="column"
                justifyContent="flex-start"
            alignItems="flex-start"
            spacing={"20px"}>
            <TaskView data={data}/>
        </Stack>
    </Shell>
    )
}

export default Page;
