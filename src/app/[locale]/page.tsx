import React, { Suspense } from "react";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import pick from "lodash/pick";

import { locales } from '@/config/config';

import Shell from "@/components/layout/Shell";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Filter from "@/components/layout/filter";
import FilterButton from "@/components/ui/buttons/FilterButton";
import {CircularLoading} from "@/components/features/Loaders";
import Content from "./page.content";

import { IPageProps } from "@/interfaces/page";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function Home({ params: { locale } }: IPageProps) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = await getMessages();
    const trans = await getTranslations();

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, 'status_chip', "errors", "common")}
        >
            <Shell
                header={
                    <Header messages={{ "connect": trans("common.connect"), "find": trans("tasks.find") }} />
                }
                withDrawer
                footer={
                    <Footer transparent={true}>
                        <FilterButton>{trans("buttons.filter")}</FilterButton>
                    </Footer>
                }
                extra={<Filter />}
            >
                <div className="pt-[15px]">
                    <Suspense fallback={<CircularLoading />}>
                        <Content />
                    </Suspense>
                </div>
            </Shell>
        </NextIntlClientProvider>
    );
}
