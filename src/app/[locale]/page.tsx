import React, {Suspense}  from "react";
import {
    // getTranslations,
    unstable_setRequestLocale
} from 'next-intl/server';
import {useTranslations} from "next-intl";
import { locales } from '@/config';
// import Await from "@/lib/await";
import Items from "./items";
import Footer from "@/components/layout/Footer";
import FilterButton from "@/components/ui/buttons/FilterButton";
import Shell from "@/components/layout/Shell";
import Header from "@/components/layout/Header";
import Drawer from "@/components/layout/drawer";

type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}


export default function Home({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const t = useTranslations();
    const header = <Header messages={{"connect": t("common.connect"), "find": t("tasks.find")}}/>
    const drawer =  <Drawer/>
    return (
        <Shell miniAppbar={false} header={header} drawer={drawer} footer={
            <Footer transparent={true}>
                <FilterButton>{t("common.filter")}</FilterButton>
            </Footer>}>
            <Suspense fallback={<div>Loading...</div>}>
                {/*<Await  promise={promise}>*/}
                <Items messages={{no_responses: t("common.no_responses")}}/>
                {/*</Await>*/}
            </Suspense>
        </Shell>
    );
}
