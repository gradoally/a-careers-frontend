import React, { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, redirect } from "next/navigation";

import { useTonConnect } from "@/hooks/useTonConnect";

import { getUserProfile } from "@/services/profile";

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
    updateUser: (userRes: IUserRes) => void;
    isRegistered: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
    user: null,
    isLoading: true,
    error: null,
    isRegistered: false,
    fetchProfile: async () => undefined,
    updateUser: (userRes: IUserRes) => { }
});

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
    const router = useRouter();
    const pathname = usePathname();

    const [auth, setAuth] = useState<IAuth>({
        user: null,
        isLoading: true,
        error: null
    });

    const createProfilePath = useMemo(() => `/${locale}/profile/create`, [locale]);

    function updateUser(userRes: IUserRes) {
        auth.user = userRes;
        setAuth({ ...auth });
    }

    const isRegistered = useMemo(() => {
        return auth.user?.found ? true : false
    }, [auth]);

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

    //Restrict create profile page access for active user
    useEffect(() => {
        if (!connected && pathname === createProfilePath)
            redirect(`/${locale}`);
        if (!connectionChecked || auth.isLoading || !auth.user) return;
        if (auth.user.found && pathname === createProfilePath)
            redirect(`/${locale}`);
    }, [connectionChecked, connected, auth]);

    //Prevent user from accessing restricted routes
    useEffect(() => {
        if (!walletAddress || auth.isLoading || !auth.user || isRegistered) return;

        const path = pathname.replace(`/${locale}`, "");
        //Check task routes
        let restrictedTaskRoute = false;
        if (path.startsWith("/tasks")) {
            const splittedRoute = path.split("/").filter(path => path);
            if (splittedRoute.length === 2) {
                restrictedTaskRoute = isNaN(Number.parseInt(splittedRoute[1]))
            }
            if (splittedRoute.length !== 2) restrictedTaskRoute = true;
        }
        const isRestrictedRoutes = restrictedTaskRoute || path === "/profile";
        if (isRestrictedRoutes) router.push(createProfilePath);

    }, [walletAddress, auth, pathname]);

    //Fetch User Profile after wallet address loads
    useEffect(() => {
        if (!connectionChecked) return;
        if (connected) {
            fetchProfile();
        } else {
            auth.isLoading = false;
            setAuth({ ...auth });
        }
    }, [connectionChecked, connected]);

    return (
        <AuthContext.Provider value={{ ...auth, isRegistered, fetchProfile, updateUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

