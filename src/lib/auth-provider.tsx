import React, { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, redirect } from "next/navigation";

import { useTonConnect } from "@/hooks/useTonConnect";

import Image from "@/components/Image";

import { APIs } from "@/config/api.config";
import { get } from "@/services/request";
import { IUser } from "@/interfaces/index";
import { useTonConnectUI } from "@tonconnect/ui-react";

interface HOCProps {
    WrappedComponent: React.ComponentType,
    redirectTo?: string
}

interface IUserRes {
    found: boolean;
    data: IUser | null;
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

function Loader() {
    return <div className="bg-primary h-screen flex justify-center items-center">
        <Image alt={"Alfamater auth loader"} src="/gifs/unicorn-low.gif"
            width={"100"} height={"100"} />
    </div>
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
        await get<IUserRes>({ url: `${APIs.user.profile(walletAddress, locale)}` })
            .then((res) => {
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
        if (!walletAddress) return;
        if (auth.isLoading || !auth.user) return;
        const createProfilePath = `/${locale}/profile/create`;

        if (!auth.user.found && pathname !== createProfilePath)
            redirect(createProfilePath);

        if (auth.user.found && pathname === createProfilePath)
            redirect(`/${locale}`);

    }, [auth, walletAddress]);

    useEffect(() => {
        fetchProfile()
    }, [walletAddress, locale]);

    return (
        <AuthContext.Provider value={{ ...auth, fetchProfile: fetchProfile }}>
            {auth.isLoading ? <Loader /> : props.children}
        </AuthContext.Provider>
    );
};

