"use client"
import React, { Fragment, useState } from "react";

import Shell from "@/components/layout/Shell";
import { useTranslations } from "next-intl";

import AppBar from "@/components/layout/app-bar";
import { Stack } from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";
import ProfileView from "@/components/Profile/ProfileView";
import { NextLinkComposed } from "@/components/Link";
import EditButton from "@/components/ui/buttons/EditButton";

import { useAuthContext } from "@/lib/provider/auth.provider";
import { CircularLoading } from "@/components/features/Loaders";

import EditProfileForm from "@/components/Profile/form/EditProfileForm";

export default function Page() {
    const trans = useTranslations();
    const { user, isLoading } = useAuthContext();
    const [edit, setEdit] = useState<boolean>(false);

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/"} />
                <Typography variant="h5" color="info.main">
                    {trans("profile.profile")}
                </Typography>
            </Stack>
            <div className="flex-grow" />
            {(user?.data?.userStatus && user?.data?.userStatus !== "moderation") && <EditButton disabled={isLoading} onClick={() => setEdit(true)} />}
        </AppBar>
    )

    return <Fragment>
        {
            isLoading ? <CircularLoading /> : (
                <>
                    {user?.data && (edit ?
                        <EditProfileForm user={user.data} close={() => setEdit(false)} /> :
                        <Shell header={header}>
                            <ProfileView data={user.data} />
                        </Shell>
                    )}
                </>
            )
        }
    </Fragment>
}

