import React, {Suspense} from "react";
import pick from "lodash/pick";
import {NextIntlClientProvider, useTranslations, useMessages} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {Stack} from "@mui/material";

import {locales} from "@/config";

import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import ProfileForm from "@/components/forms/ProfileForm";
import {NextLinkComposed} from "@/components/Link";
import BackButton from "@/components/ui/buttons/BackButton";
import LazyLoading from "@/components/features/LazyLoading";
import {fetchClientGetter} from "@/openapi/client-getter"
import Await from "@/lib/await";

type Props = {
    params: {
        locale: string;
    };
};


export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();

    const t = useTranslations("profile");
    const tc = useTranslations("common");
    const fetchClient = fetchClientGetter()


    const promise = fetchClient.search.getApiFinduser({
        address: "EQADhEECaDCkQWcg87uZWMO6f9QrigHTOPtxW1DEQPuHwNxO"
    })

    const header = (
        <AppBar >
            <Stack direction="row" alignItems="center" spacing={"10px"}>
                <BackButton component={NextLinkComposed} to={"/create-profile/profile"}/>
                <Typography
                    variant="h5"
                    sx={{color: "info.main"}}>
                    {tc("edit_profile")}
                </Typography>
            </Stack>
        </AppBar>
    )
    const footer = (
        <Footer>
            <FooterButton
                component={NextLinkComposed}
                to={'/create-profile/profile'}
                className="w-full"
                color={"secondary"} sx={{color: "common.black"}}
                variant="contained">
                {t("update_on_blockchain")}
            </FooterButton>
            <Typography variant="body2">{tc("network_commission", {value: "0.011 TON"})}</Typography>
        </Footer>
    )


    return (
        <Shell miniAppbar={true} withDrawer header={header} footer={footer}>
            <div className="p-[20px]">
                <div className="flex justify-center mb-[30px]">
                    <Avatar sx={{"height": "90px", width: "90px"}} alt="Avatar" src={"/avatar.png"}/>
                </div>

                <NextIntlClientProvider
                    locale={locale}
                    messages={pick(messages, 'profile', 'common')}
                >
                    <Suspense fallback={<LazyLoading/>}>
                        <Await promise={promise}>
                            {({found, data})=>{
                                if (!found)  return <div>404</div>
                                return (
                                    <ProfileForm data={data}/>
                                )
                            }}
                        </Await>
                    </Suspense>
                </NextIntlClientProvider>
            </div>
        </Shell>
    )
}

export default Page;