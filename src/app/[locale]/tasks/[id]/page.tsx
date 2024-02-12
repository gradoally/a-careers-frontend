import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

import Avatar from '@mui/material/Avatar';
import Footer from "@/components/layout/Footer";
import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import {locales} from "@/config";
import FooterButton from "@/components/ui/buttons/FooterButton";

import MenuButton from "@/components/ui/buttons/MenuButton";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import StatusChip from "@/components/StatusChip";
import CopyContainer from "@/components/features/copy";

type Props = {
    params: { locale: string, id: number };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const StackContainer = ({primary, secondary}: {
    primary: string;
    secondary: string;
}) => {
    return (
        <Stack component="div" spacing={"3px"} direction="column">
            <Typography component="div" variant={"caption"}>
                {secondary}
            </Typography>
            <Typography variant="body2">
                {primary}
            </Typography>
        </Stack>
    )
}

const Page = ({params: {locale, id}}: Props) => {
    unstable_setRequestLocale(locale);
    const tc = useTranslations("common");
    const t = useTranslations("tasks");
    const data = {
        "title": "Доработать мета-данные и память смарт-контракта",
        "diamonds": 1225,
        "proposals": 0,
        "language": {"label": "Русский"},
        "description": "Необходимо доработать смарт-контракт таким образом, что бы при деплое он хранил ссылку на одни метаданные, а после передачи собственности с кошелька владельца метаданные менялись на другие. Изначально элементы коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи на маркетплейсе у владельца должен появиться.",
        "technical_task": "Необходимо доработать смарт-контракт таким образом, что бы при деплое он хранил ссылку на одни метаданные, а после передачи собственности с кошелька владельца метаданные менялись на другие. Изначально элементы коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи на маркетплейсе у владельца должен появиться.",
        "deadline": "21 июня, 21:00",
        "created_at": "Создано 7 июня в 16:53 на русском языке",
        "category": "Категория «Разработка на блокчейне TON»",
        "customer": {
            "id": 1,
            "image": "/avatar.png",
            "username": "@another_kote",
            "telegram": "@another_kote"
        }
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
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>{t("detail", {value: "#234567"})}</Typography>
            </Stack>

            <div className="flex-grow"/>
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
        <Shell miniAppbar={true} header={header} footer={footer} withDrawer>
            <Stack
                className="p-[20px]"
                component="div"
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={"20px"}>
            </Stack>
        </Shell>
    )
}

export default Page;
