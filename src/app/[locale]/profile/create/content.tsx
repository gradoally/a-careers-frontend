"use client"
import {useEffect} from "react";
import {useTranslations, useLocale} from "next-intl";
import {useMasterContract} from "@/hooks/useMasterContract";
import {useTonClient} from '@/hooks/useTonClient';
import {UserContentData, buildUserContent} from '@/contracts/User';

import {useAuthContext} from "@/lib/auth-provider";
import ProfileForm, {UserFormValues} from "@/components/forms/ProfileForm";
import {useTonConnect} from "@/hooks/useTonConnect";
import {useRouter} from "next/navigation";

const Content = () => {
    const {userNextIndex, address: masterContractAddr, sendCreateUser} = useMasterContract();
    const {user, reFetchUserData} = useAuthContext()
    // const {connected} = useTonConnect()
    const router = useRouter();
    const locale = useLocale()
    const t = useTranslations()
    const {client} = useTonClient();
    // useEffect(() => {
    //     // if (!connected) {
    //     //     router.push(`/${locale}`)
    //     // } else
    //     if (connected && user) {
    //         router.push(`/${locale}/profile`)
    //     }
    // }, [])

    const createUserProfile = async (values: UserFormValues, callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        if (userNextIndex == null || client == null || user)
            return;

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
            };

            sendCreateUser("0.3", 0, buildUserContent(userContentData));

            await callback({
                isError: false,
                message: t("profile.profile_successfully_connected")
            })
            await reFetchUserData()
            router.push(`/${locale}/profile`)

        } catch (e) {
            console.log(e)
            await callback({isError: true, message: String(e)})

            // await callback({isError: true, message: t("errors.something_went_wrong_sorry")})
        }
    };

    return (
        <ProfileForm onSubmit={createUserProfile}/>
    )
}

export default Content;