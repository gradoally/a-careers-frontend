"use client"
import React, { useState } from "react";

import Shell from "@/components/layout/Shell";
import { useTranslations } from "next-intl";

import AppBar from "@/components/layout/app-bar";
import { Stack } from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";
import ProfileView from "@/components/ProfileView";
import { NextLinkComposed } from "@/components/Link";
import EditButton from "@/components/ui/buttons/EditButton";

import { useAuthContext } from "@/lib/provider/auth.provider";
import { CircularLoading } from "@/components/features/Loaders";

import EditProfileForm from "@/components/forms/Profile/EditProfileForm";

const Content = () => {
    const trans = useTranslations();
    const { user, isLoading } = useAuthContext();
    const [edit, setEdit] = useState<boolean>(false);

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
                {isLoading ? <CircularLoading /> : <ProfileView data={user.data} />}
            </Shell>
        )
    }

    return (
        <EditProfileForm
            user={user.data}
            close={() => setEdit(false)}
        />
    )
}

export default Content;
