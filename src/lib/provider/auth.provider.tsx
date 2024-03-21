import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, redirect } from "next/navigation";

import { useTonConnect } from "@/hooks/useTonConnect";

import { getUserProfile } from "@/services/profile";

import { Loader } from "@/components/Loader";

import { IUserRes } from "@/interfaces/request";

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
}

const AuthContext = React.createContext<IAuthContext>({
    user: null,
    isLoading: true,
    error: null,
    fetchProfile: async () => undefined
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

    const { walletAddress } = useTonConnect();
    const locale = useLocale()
    const pathname = usePathname();

    const [auth, setAuth] = useState<IAuth>({
        user: null,
        isLoading: false,
        error: null
    });

    async function fetchProfile() {
        if (!walletAddress || !locale) return;
        //Find user profile
        setAuth({
            isLoading: true,
            user: null,
            error: null
        })
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
                    user:  res.data || null,
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
       
        if (auth.isLoading || !auth.user) return;
        if (!auth.user.found && pathname !== createProfilePath)
            redirect(createProfilePath);
        if (auth.user.found && pathname === createProfilePath)
            redirect(`/${locale}`);
    }, [auth, walletAddress]);

    //Fetch User Profile
    useEffect(() => {
        fetchProfile()
    }, [walletAddress, locale]);

    return (
        <AuthContext.Provider value={{ ...auth, fetchProfile: fetchProfile }}>
            {auth.isLoading ? <Loader /> : props.children}
        </AuthContext.Provider>
    );
};

