import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "@/config";

type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}


const Page = async ({params: {locale}}: Props) => {
    unstable_setRequestLocale(locale);
    return (
        <div/>
    )
}

export default Page;