"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import BackButton from "@/components/ui/buttons/BackButton";
import ProfileView from "@/components/ProfileView";
import LazyLoading from "@/components/features/LazyLoading";

import { getUser } from "@/services/profile";

import { IUser } from "@/interfaces";

interface IUserRes {
    status: string;
    loading: boolean;
    content: IUser | null;
}

export default function Page({ params: { id } }: { params: { id: string } }) {

    const trans = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const [user, setUser] = useState<IUserRes>({
        status: "",
        loading: true,
        content: null
    });

    useEffect(() => {
        if (user.status && user.loading) return;
        setUser({
            ...user,
            status: "loading"
        });

        getUser({ index: id, locale })
            .then((res) => {
                if (!res.data) throw { message: "Not found!" };
                setUser({
                    status: "success",
                    loading: false,
                    content: res.data
                })
            })
            .catch(() => {
                setUser({
                    status: "fail",
                    loading: false,
                    content: null
                })
            })

    }, [id]);

    const ProfileHeader = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton onClick={router.back} />
                <Typography variant="h5" color="info.main">
                    {trans("profile.profile")}
                </Typography>
            </Stack>
        </AppBar>
    )

    return (
        <Shell header={ProfileHeader}>
            {user.loading ? <LazyLoading /> : (user.content ? <ProfileView data={user.content} /> : <></>)}
        </Shell>
    )
}
