"use client"

import type {ReactNode} from "react";
import React, {useEffect} from "react";
import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "next/navigation";
import useSWR from 'swr'
import {User} from "@/openapi/client";
import {fetchClientGetter} from "@/openapi/client-getter";

import {useTonConnect} from "@/hooks/useTonConnect";
import Image from "@/components/Image";

type AuthContextType = {
    user: User | null
    reFetchUserData: () => Promise<void>

    isLoading: boolean;
    error: string | null;
}

type Props = {
    children: ReactNode;
};

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    isLoading: false,
    error: null,
    reFetchUserData: async () => undefined
})

const fetcher = async (url: any) => {
    console.log()
    const response = await fetch(url)
    return response.json()

}
// const fetcher = (url: string|null) => fetch(url).then((res) => res.json());


const AuthProvider = (props: Props) => {
    // const [isLoading, setIsLoading] = React.useState<boolean>(false);
    // const [error, setError] = React.useState<string | null>(null);

    const {walletAddress, connected} = useTonConnect()
    const locale = useLocale()

    const t = useTranslations("errors")
    const router = useRouter();
    const pathname = usePathname();
    const fetchClient = fetchClientGetter({locale: locale, next: {revalidate: false}})

    const getKey = () => {
        if (!walletAddress) return null;
        return `/${locale}/api/users/get-user/?value=${walletAddress}`;
    };
    const { data, mutate, error, isLoading } = useSWR(getKey, fetcher, {
        revalidateOnReconnect: true,
    })

    // const fetchData = async () => {
    //     if (walletAddress) {
    //         // setIsLoading(true)
    //         try {
    //             const response = await fetchClient.search.getApiFinduser({
    //                 address: walletAddress, translateTo: locale
    //             })
    //             if (response?.found && response?.data) {
    //                 // setUser(response.data)
    //                 return response.data
    //             }
    //             console.log(response, "auth response")
    //             // setIsLoading(false)
    //             // setError(null)
    //         } catch (e) {
    //             console.log(e, "auth exception")
    //         }
    //     }
    //     return null;
    // }
    //
    // const [user, setUser] = React.useState<User | null>(null)

    useEffect(()=>{
        console.log("isLoading", "data", "walletAddress")
        console.log(isLoading, data, walletAddress)
        if (!walletAddress) return
        if (!data && pathname !== `/${locale}/profile/create`){
            router.replace(`/${locale}/profile/create`)
        } else if (data && pathname === `/${locale}/profile/create`) {
            router.replace(`/${locale}/profile/`)
        }
    },[data])

    // const fecthCallback = React.useCallback(async () => {
    //     await mutate();
    //     setUser(data);
    // }, [walletAddress]);
    //
    // useEffect(()=>{
    //     if (!walletAddress){
    //         setUser(null);
    //     }else{
    //         fecthCallback()
    //     }
    // }, [walletAddress])

    const memoValue = React.useMemo(
        () => ({
            user: data,
            isLoading: isLoading,
            error: error,
            reFetchUserData: mutate,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data]
    )

    if (!connected && (walletAddress && !data) || isLoading){
        return (
            <div className="bg-primary h-screen flex justify-center items-center">
                <Image alt={"Alfamater auth loader"} src="/unicorn-low.gif"
                       width={"100"} height={"100"}/>
            </div>
        )
    }
    return (
        <AuthContext.Provider value={memoValue}>
            {props.children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = (): AuthContextType => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}


export default AuthProvider;
