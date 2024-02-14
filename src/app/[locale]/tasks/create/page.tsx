import React from "react";

import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/config";
import Stepper from "./stepper";
type Props = {
    params: {
        category: string;
        locale: string;
    };
};


export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props)=>{
    // Enable static rendering
    unstable_setRequestLocale(locale);

    return (<Stepper/>)
}

export default Page;