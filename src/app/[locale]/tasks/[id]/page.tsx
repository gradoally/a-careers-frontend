import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

import Avatar from '@mui/material/Avatar';
import Footer from "@/components/layout/Footer";
import Shell from "@/components/layout/Shell";
import {MiniAppbar} from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import {locales} from "@/config";
import FooterButton from "@/components/ui/buttons/FooterButton";

import MenuButton from "@/components/ui/buttons/MenuButton";
import Drawer from "@/components/layout/drawer";
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";

type Props = {
    params: { locale: string, id: number };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const StackContainer = ({primary, secondary, primaryHeight="15px"}: {primary: string, secondary: string, primaryHeight?: string})=>{
    return (

        <Stack component="div" spacing={"3px"} direction="column">
            <Typography  sx={{
                lineHeight: "19px",
            }} variant={"caption"}>
                {secondary}
            </Typography>
            <Typography sx={{
                lineHeight: primaryHeight,
            }} variant="body2">
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
        <Footer grow={true}>
            <FooterButton
                color={"secondary"} sx={{color: "common.black", width: "100%"}}
                variant="contained">
                {tc("log_in_and_respond")}
            </FooterButton>
        </Footer>
    )
    const header = (
        <MiniAppbar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>{t("detail", {value: "#234567"})}</Typography>
            </Stack>

            <Box component="div" sx={{flexGrow: 1}}/>

            <Stack direction="row" alignItems="center" spacing={"15px"}>
                <Avatar alt="Diamond"
                        src="/diamond.png"
                        sx={{width: 30, height: 30, bgcolor: "common.white"}}
                />
                <MenuButton/>
            </Stack>
        </MiniAppbar>
    )
    return (
        <Shell miniAppbar={true} header={header} footer={footer} drawer={<Drawer/>}>
            <Box component="div" sx={{"padding": "20px 0", }}>
            <Stack
                component="div"
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={"20px"}>
                <div>
                    <Box sx={{
                        padding: "3px 0 0 4px",
                        color: "warning.main",
                        width: "86px",
                        height: "17px",
                        top: "81px",
                        left: "20px",
                        borderRadius: "2px",
                        border: "1px solid #00FF47",
                        fontSize: "9px",
                        fontWeight: "400",
                        lineHeight: "11px",
                        letterSpacing: "0.06em",
                        marginBottom: '7px',

                    }}>
                        {tc("no_responses")}
                        {/*<Chip*/}
                        {/*    label={tc("no_responses")}*/}
                        {/*    sx={{borderRadius: "2px"}}*/}
                        {/*    size="small" variant="outlined" color="warning"/>*/}
                    </Box>
                    <Typography variant="h4">{data.title}</Typography>
                    <Typography  sx={{
                        marginTop: "10px",
                        lineHeight: "15px",
                    }} variant="body2">
                        💎 {data.diamonds}
                    </Typography>
                </div>
                <StackContainer primary={"EQCISAJu…W_JqYM3t"} secondary={tc("smart_contract_address")}/>
                <StackContainer primary={data.language.label} secondary={t("language")}/>

                <StackContainer primaryHeight={"20px"} primary={data.description} secondary={tc("description")}/>
                <StackContainer primaryHeight={"20px"} primary={data.technical_task} secondary={tc("technical_task")}/>
                <StackContainer primary={data.deadline} secondary={tc("deadline")}/>
                <Divider/>

                <Stack spacing={"0"}  direction="column">
                    <Typography sx={{'fontSize': "10px", "lineHeight": "20px"}} variant={"caption"}>
                        {data.created_at}
                    </Typography>
                    <Typography sx={{'fontSize': "10px", "lineHeight": "20px"}} variant={"caption"}>
                        {data.category}
                    </Typography>
                </Stack>
                <Stack spacing={"20px"} direction={"column"}>
                    <Typography variant="body2">{tc("customer")}</Typography>
                    <Box component="div">
                        <Stack component="div" direction="row" spacing={3}>
                            <Avatar sx={{"height": "80px", width: "80px"}} alt="Avatar" src={data.customer.image}/>
                            <Stack direction={"column"} spacing={"7px"} component={"div"}>
                                <Typography variant="body2">{data.customer.username}</Typography>
                                <Stack component="div" sx={{fontSize: "10px"}} direction="row" spacing="5px">
                                    <div>✅ 2</div>
                                    <div>❎ 1</div>
                                </Stack>
                                <Stack component="div" sx={{fontSize: "10px"}} direction="row" spacing="5px">
                                    <Link  href={`/profile/${data.customer.id}`}>
                                        <Typography sx={{color: "info.main"}} variant={"caption"}>{tc("profile")} 📖</Typography>
                                    </Link>
                                    <Link href={data.customer.telegram}>
                                        <Typography sx={{color: "info.main"}} variant={"caption"}>Telegram</Typography>
                                    </Link>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
            </Box>
        </Shell>
    )
}

export default Page;
