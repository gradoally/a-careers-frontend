import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, redirect } from "next/navigation";

import { useTonConnect } from "@/hooks/useTonConnect";

import { getUserProfile } from "@/services/profile";

import { Loader } from "@/components/features/Loaders";

import { IUserRes } from "@/interfaces/request";
import { IUser } from "@/interfaces";

interface HOCProps {
    WrappedComponent: React.ComponentType,
    redirectTo?: string
}

interface IAuth {
    user: IUserRes | null;
    isLoading: boolean;
    error: string | null;
}

interface IAuthContext extends IAuth {
    fetchProfile: () => Promise<void>;
    updateUser: (userRes: IUserRes) => void;
}

const AuthContext = React.createContext<IAuthContext>({
    user: null,
    isLoading: true,
    error: null,
    fetchProfile: async () => undefined,
    updateUser: (userRes: IUserRes) => { }
})

export const withAuth = ({ WrappedComponent, redirectTo = "/" }: HOCProps) => {

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    return function ComponentWithData() {
        const { user } = useAuthContext();
        const router = useRouter();
        const locale = useLocale()
        useEffect(() => {
            if (!user) {
                if (redirectTo?.startsWith("/")) {
                    router.replace(`/${locale}${redirectTo}`)
                } else {
                    router.replace(`/${locale}/${redirectTo}`)
                }
            }
        }, [])
        return (<WrappedComponent />)
    }
}

export const useAuthContext = (): IAuthContext => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}

export default function AuthProvider(props: React.PropsWithChildren) {

    const { walletAddress, connected, connectionChecked } = useTonConnect();
    const locale = useLocale()
    const pathname = usePathname();

    const [auth, setAuth] = useState<IAuth>({
        user: null,
        isLoading: false,
        error: null
    });

    function updateUser(userRes: IUserRes) {
        auth.user = userRes;
        setAuth({ ...auth });
    }

    async function fetchProfile() {
        if (!walletAddress) return;
        //Find user profile
        setAuth({
            isLoading: true,
            user: null,
            error: null
        });

        await getUserProfile({ address: walletAddress, locale })
            .then((res) => {
                if (res.status != 'success') {
                    setAuth({
                        isLoading: false,
                        user: res.data || null,
                        error: "Fail to find user"
                    });
                    return;
                }
                
                setAuth({
                    isLoading: false,
                    user: res.data || null,
                    error: null
                });
            })
            .catch(err => {
                setAuth({
                    isLoading: false,
                    user: null,
                    error: err.message
                });
            })
    }

    useEffect(() => {

        const createProfilePath = `/${locale}/profile/create`;

        if (!connected && pathname === createProfilePath)
            redirect(`/${locale}`);

        if (!connectionChecked) return;

        if (auth.isLoading || !auth.user) return;

        if (!auth.user.found && pathname !== createProfilePath)
            redirect(createProfilePath);

        if (auth.user.found && pathname === createProfilePath)
            redirect(`/${locale}`);

    }, [auth, connected, connectionChecked]);

    //Fetch User Profile
    useEffect(() => {
        if (!walletAddress) return;
        fetchProfile()
    }, [walletAddress, locale]);

    return (
        <AuthContext.Provider value={{ ...auth, fetchProfile, updateUser }}>
            {props.children}
            {auth.isLoading && <Loader className="absolute top-0 left-0 z-[500]" />}
        </AuthContext.Provider>
    );
};

