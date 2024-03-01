"use client"

import React, {useEffect, useState} from "react";

import {User} from "@/openapi/client";
import Shell from "@/components/layout/Shell";
import {useLocale, useTranslations} from "next-intl";

import ProfileForm, {UserFormValues} from "@/components/forms/ProfileForm";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";
import UserAvatar from "@/components/UserAvatar";
import ProfileView from "@/components/ProfileView";
import {NextLinkComposed} from "@/components/Link";
import EditButton from "@/components/ui/buttons/EditButton";
import {useUserContract} from "@/hooks/useUserContract";
import {useTonClient} from "@/hooks/useTonClient";
import {useAuthContext} from "@/lib/auth-provider";
import {useTonConnect} from "@/hooks/useTonConnect";
import {buildUserContent} from '@/contracts/User';
import LazyLoading from "@/components/features/LazyLoading";


const EditComponent = ({data}: {data: User})=>{
    const {client} = useTonClient();

    const {
        sendChangeContent,
    } = useUserContract(String(data?.address));
    const t = useTranslations()

    const updateUserProfile = async (values: UserFormValues, callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        console.log(client, data, 'updateUserProfile before')
        if (client == null || data == null)
            return;
        console.log("after", 'updateUserProfile')

        try {
            const userContentData = {
                isUser: true,
                isFreelancer: true,
                nickname: values.nickname,
                telegram: values.telegram,
                about: values.about,
                website: values.website,
                portfolio: values.portfolio,
                resume: values.resume,
                specialization: values.specialization.join("##"),
            };

            const result = sendChangeContent("0.5", 0, buildUserContent(userContentData));
            console.log(result)
            await callback({
                isError: false,
                message: t("profile.profile_successfully_updated")
            })
        } catch (e) {
            await callback({isError: true, message: t("errors.something_went_wrong_sorry")})
            console.log("update_user_profile", e)
        }
    };

    return (
        <ProfileForm onSubmit={updateUserProfile} data={data}/>
    )
}

const Content = () => {
    const [edit, setEdit] = useState<boolean>(false)
    const t = useTranslations();
    const {user, isLoading} = useAuthContext()
    const {connected, walletAddress} = useTonConnect()
    // const router = useRouter();
    // const locale = useLocale()

    console.log("connected", "walletAddress", "user", "isLoading")
    console.log(connected, walletAddress, user, isLoading)

    // useEffect(() => {
    //     if (walletAddress && !user){
    //         router.push(`/${locale}/profile/create`)
    //     }else if (!connected){
    //         toast("You do not connect ton wallet yet")
    //         router.push(`/${locale}`)
    //     }
    // }, []);


    const header = (
        <AppBar height="60px">
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

    const profileHeader = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/my"}/>
                <Typography variant="h5" color="info.main">
                    {t("profile.profile")}
                </Typography>
            </Stack>
            <div className="flex-grow"/>
            <EditButton disabled={isLoading} onClick={() => setEdit(true)}/>
        </AppBar>
    )

    if (user===null) {
        return (
            <Shell>
                <div/>
            </Shell>
        )
    }

    if (!edit) {
        return (
            <Shell  header={profileHeader}>
                {isLoading ?<LazyLoading/>:<ProfileView data={user} />}
            </Shell>
        )
    }

    return (
        <Shell header={header}>
            <div className="p-5">
                <div className="flex justify-center mb-[30px]">
                    <UserAvatar height={"90px"} width={"90px"}/>
                </div>
                <EditComponent data={user}/>
            </div>
        </Shell>
    )

}

export default Content;
