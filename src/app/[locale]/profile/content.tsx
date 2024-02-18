"use client"

import React, {Suspense, useState} from "react";

import {User} from "@/openapi/client";
import Shell from "@/components/layout/Shell";
import {useTranslations} from "next-intl";

import ProfileForm from "@/components/forms/ProfileForm";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import UserAvatar from "@/components/UserAvatar";
import ProfileView from "@/components/ProfileView";
import {NextLinkComposed} from "@/components/Link";
import EditButton from "@/components/ui/buttons/EditButton";


interface Props {
    user: User;
}

const Content = (props: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const t = useTranslations();

    const handleClick = () => {
        console.log("Update on blockchain")
    }

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton onClick={() => setEdit(false)}/>
                <Typography
                    variant="h5"
                    sx={{color: "info.main"}}>
                    {t("profile.edit")}
                </Typography>
            </Stack>
        </AppBar>
    )
    const footer = (
        <Footer>
            <FooterButton
                color={"secondary"}
                sx={{color: "common.black"}}
                onClick={() => handleClick()}
                variant="contained">
                {t("profile.update_on_blockchain")}
            </FooterButton>
            <Typography variant="body2">{t("network.commission", {value: "0.011 TON"})}</Typography>
        </Footer>
    )
    const history =[
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

    const profileHeader = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/my"}/>
                <Typography variant="h5" color="info.main">
                    {t("profile.profile")}
                </Typography>
            </Stack>
            <div className="flex-grow"/>
            <EditButton onClick={() => setEdit(true)}/>
        </AppBar>
    )


    if (edit) {
        return (
            <Shell withDrawer header={header} footer={footer}>
                <div className="p-5">
                    <div className="flex justify-center mb-[30px]">
                        <UserAvatar height={"90px"} width={"90px"}/>
                    </div>
                    <ProfileForm data={props.user}/>
                </div>
            </Shell>
        )
    }


    return (
        <Shell padding="60px 0 0 0" header={profileHeader}>
            <ProfileView data={props.user} history={history}/>
        </Shell>
    )
}

export default Content;