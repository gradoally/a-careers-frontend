import { useTranslations } from "next-intl";

import { useScreen } from "@/lib/provider/screen.provider";
import { useUserContract } from "@/hooks/useUserContract";
import { useTonClient } from "@/hooks/useTonClient";

import ProfileForm, { UserFormValues } from "@/components/forms/Profile/ProfileForm";

import { UserContentData, buildUserContent } from '@/contracts/User';
import { IUser } from "@/interfaces";

export default function EditProfileForm(props: {
    close: () => void;
    user: IUser;
}) {

    const trans = useTranslations()
    const { client } = useTonClient();
    const { toggleTxProgress, toggleFailScreen } = useScreen();

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
            toggleTxProgress(true);
            await sendChangeContent("0.5", 0, buildUserContent(userContentData));
            await callback({
                isError: false,
                message: trans("profile.profile_successfully_updated")
            })
        } catch (e) {
            console.log("error occured!");
            //await callback({ isError: true, message: trans("errors.something_went_wrong_sorry") })
            toggleFailScreen(true);
        }
        toggleTxProgress(false);
    };

    return <ProfileForm
        title={trans("profile.edit")}
        back={props.close}
        onSubmit={updateUserProfile}
        action="update"
        data={props.user}
    />

}
