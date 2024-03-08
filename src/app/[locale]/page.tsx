import React, { Suspense } from "react";
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import pick from "lodash/pick";
import { NextIntlClientProvider } from "next-intl";

import { locales } from '@/config/config';
import Shell from "@/components/layout/Shell";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Filter from "@/components/layout/filter";
import FilterButton from "@/components/ui/buttons/FilterButton";
import LazyLoading from "@/components/features/LazyLoading";

import Content from "./content";

type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function Home({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    const trans = await getTranslations();
    const header = <Header messages={{ "connect": trans("common.connect"), "find": trans("tasks.find") }} />
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, 'status_chip', "errors", "common")}
        >
            <Shell header={header} withDrawer footer={
                <Footer transparent={true}>
                    <FilterButton>{trans("buttons.filter")}</FilterButton>
                </Footer>}
                extra={<Filter />}>
                <div className="pt-[15px]">
                    <Suspense fallback={<LazyLoading />}>
                        <Content />
                    </Suspense>
                </div>
            </Shell>
        </NextIntlClientProvider>
    );
}
