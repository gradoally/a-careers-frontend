"use client"

import { useTranslations } from "next-intl";

import Shell from "@/components/layout/Shell";
import React, { Suspense } from "react";
import AppBar from "@/components/layout/app-bar";
import { Stack } from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import Typography from "@mui/material/Typography";

import { NextLinkComposed } from "@/components/Link";
import TaskList from "@/components/Task/TaskList";
import CenteredContainer from "@/components/ui/CenteredContainer";

import { Order } from "@/openapi/client";

type Props = {
    params: {
        locale: string;
    };
};

const Page = ({ params: { locale } }: Props) => {

    const tc = useTranslations("common");
    const trans = useTranslations("tasks");
    const data: Order[] = [
        {
            "name": "Расширение редактируемого стандарта NFT",
            "createdAt": "2024-02-07T10:09:38+00:00",
            "responsesCount": 0,
            "price": 567,
        },
        {
            "name": "Расширение редактируемого стандарта NFT",
            "createdAt": "2024-02-07T10:09:38+00:00",
            "responsesCount": 1,
            "price": 567,
        },
        {
            "name": "Расширение редактируемого стандарта NFT",
            "createdAt": "2024-02-07T10:09:38+00:00",
            "responsesCount": 0,
            "price": 567,
        },
        {
            "name": "Расширение редактируемого стандарта NFT",
            "createdAt": "2024-02-07T10:09:38+00:00",
            "responsesCount": 1,
            "price": 567,
        },
    ];

    const header = (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/tasks/my"} />
                <Typography
                    variant="h5"
                    sx={{ color: "info.main" }}>
                    {trans("on_moderation", { value: "777" })}
                </Typography>
            </Stack>
        </AppBar>
    )
    return (
        <Shell header={header}>
            <div className="pb-5 pt-[15px]">
                <Suspense fallback={<div>Loading...</div>}>
                    {data ? (
                        <TaskList data={data} />
                    ) : (
                        <CenteredContainer>
                            {tc("no_more_data")}
                        </CenteredContainer>
                    )}
                </Suspense>
            </div>
        </Shell>
    )
}

export default Page;
