"use client"
import Image from "next/image";
import React, { useState } from "react";

import Shell from "@/components/layout/Shell";
import { useTranslations } from "next-intl";

import { useTxProgress } from "@/lib/provider/txProgress.provider";

import ProfileForm, { UserFormValues } from "@/components/forms/ProfileForm";
import AppBar from "@/components/layout/app-bar";
import { Stack } from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";
import ProfileView from "@/components/ProfileView";
import { NextLinkComposed } from "@/components/Link";
import EditButton from "@/components/ui/buttons/EditButton";
import { useUserContract } from "@/hooks/useUserContract";
import { useTonClient } from "@/hooks/useTonClient";
import { useAuthContext } from "@/lib/provider/auth.provider";
import { UserContentData, buildUserContent } from '@/contracts/User';
import LazyLoading from "@/components/features/LazyLoading";

import { IUser } from "@/interfaces";

import ProfileIcon from "@/assets/gif/unicorn-low.gif";

const EditComponent = ({ data }: { data: IUser }) => {
    const { client } = useTonClient();
    const { toggleTxProgress } = useTxProgress();

    const {
        sendChangeContent,
    } = useUserContract(String(data?.address));
    const trans = useTranslations()

    const updateUserProfile = async (values: UserFormValues, callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        if (client == null || data == null) {
            await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") })
            return;
        }
        try {
            const userContentData: UserContentData = {
                isUser: true,
                isFreelancer: true,
                nickname: values.nickname,
                telegram: values.telegram,
                about: values.about,
                website: values.website,
                portfolio: values.portfolio,
                resume: values.resume,
                specialization: values.specialization.join("##"),
                language: values.language,
            };

            console.log(userContentData);
            console.log(buildUserContent(userContentData));
            toggleTxProgress(true);
            await sendChangeContent("0.5", 0, buildUserContent(userContentData));
            await callback({
                isError: false,
                message: trans("profile.profile_successfully_updated")
            })
        } catch (e) {
            console.log("error occured!");
            await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") })
        }
        toggleTxProgress(false);
    };

    return (
        <ProfileForm onSubmit={updateUserProfile} action="update" data={data} />
    )
}

const Content = () => {
    const trans = useTranslations();
    const { user, isLoading } = useAuthContext();
    const [edit, setEdit] = useState<boolean>(false);

    const header = (
        <AppBar height="60px">
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton onClick={() => setEdit(false)} />
                <Typography
                    variant="h5"
                    sx={{ color: "info.main" }}>
                    {trans("profile.edit")}
                </Typography>
            </Stack>
        </AppBar>
    )

    const profileHeader = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/"} />
                <Typography variant="h5" color="info.main">
                    {trans("profile.profile")}
                </Typography>
            </Stack>
            <div className="flex-grow" />
            <EditButton disabled={isLoading} onClick={() => setEdit(true)} />
        </AppBar>
    )

    if (!user || !user?.data) {
        return (
            <Shell>
                <div />
            </Shell>
        )
    }

    if (!edit) {
        return (
            <Shell header={profileHeader}>
                {isLoading ? <LazyLoading /> : <ProfileView data={user.data} />}
            </Shell>
        )
    }

    return (
        <Shell header={header}>
            <div className="p-5">
                <div className="flex justify-center mb-[30px]">
                    <Image src={ProfileIcon} alt="profile" width={90} height={90} />
                </div>
                <EditComponent data={user.data} />
            </div>
        </Shell>
    )
}

export default Content;
