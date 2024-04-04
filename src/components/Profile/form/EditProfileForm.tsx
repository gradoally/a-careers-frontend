import { useLocale, useTranslations } from "next-intl";

import { useUserContract } from "@/hooks/useUserContract";
import { useTonClient } from "@/hooks/useTonClient";
import useTxChecker from "@/hooks/useTxChecker";

import ProfileForm, { UserFormValues } from "@/components/Profile/form/ProfileForm";

import { getUserProfile } from "@/services/profile";

import { UserContentData, buildUserContent } from '@/contracts/User';
import { IUser } from "@/interfaces";
import { useAuthContext } from "@/lib/provider/auth.provider";

export default function EditProfileForm(props: {
    close: () => void;
    user: IUser;
}) {

    const locale = useLocale();
    const trans = useTranslations()
    const { client } = useTonClient();
    const { updateUser } = useAuthContext();
    const { checkTxProgress } = useTxChecker();

    const {
        sendChangeContent,
    } = useUserContract(String(props.user?.address));

    const updateUserProfile = async (values: UserFormValues, callback: (props: {
        isError: boolean, message?: string | null
    }) => Promise<void>) => {
        if (client == null || props.user == null) {
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
                specialization: values.specialization.join(","),
                language: values.language,
            };

            await sendChangeContent("0.2", 0, buildUserContent(userContentData));

            checkTxProgress(async (successCB) => {
                //Fetch profile
                const profileRes = await getUserProfile({ address: props.user?.userAddress || "", locale });
                if (!profileRes.data) throw new Error();
                //check profile properties changed or not
                const newStatus = profileRes.data.data?.userStatus || "";
                const oldStatus = props.user.userStatus;
                //if changed call success CB else continue
                if (oldStatus !== newStatus) {
                    successCB();
                    await callback({
                        isError: false,
                        message: trans("profile.profile_successfully_updated")
                    });
                    updateUser(profileRes.data);
                }
            });
        } catch (e) {
            console.log("error occured!");
            await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") })
        }
    };

    return <ProfileForm
        title={trans("profile.edit")}
        back={props.close}
        onSubmit={updateUserProfile}
        action="update"
        data={props.user}
    />

}