"use client"
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { useMasterContract } from "@/hooks/useMasterContract";
import { useTonClient } from '@/hooks/useTonClient';
import { UserContentData, buildUserContent } from '@/contracts/User';

import ProfileForm, { UserFormValues } from "@/components/forms/ProfileForm";

import { useAuthContext } from "@/lib/auth-provider";

const Content = () => {
    const { userNextIndex, address: masterContractAddr, sendCreateUser } = useMasterContract();
    const { user, fetchProfile } = useAuthContext()
    const router = useRouter();
    const locale = useLocale();
    const trans = useTranslations();
    const { client } = useTonClient();

    const createUserProfile = async (values: UserFormValues, callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {

        if (userNextIndex == null || client == null || user?.found) {
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

            await sendCreateUser("0.3", 0, buildUserContent(userContentData));

            await callback({
                isError: false,
                message: trans("profile.profile_successfully_connected"),
            })
            await fetchProfile();
            router.push(`/${locale}/profile`)
        } catch (e) {
            await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") })
        }
    };

    return (
        <ProfileForm action="create" onSubmit={createUserProfile} />
    )
}

export default Content;