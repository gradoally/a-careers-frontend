import React, {Suspense} from "react";
import {unstable_setRequestLocale} from 'next-intl/server';
import {useTranslations} from "next-intl";
import {locales} from '@/config';
import Footer from "@/components/layout/Footer";
import FilterButton from "@/components/ui/buttons/FilterButton";
import Shell from "@/components/layout/Shell";
import Header from "@/components/layout/Header";
import TaskList from "@/components/TaskList";
import Filter from "@/components/layout/filter";

type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}


export default function Home({params: {locale}}: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const t = useTranslations();
    const header = <Header messages={{"connect": t("common.connect"), "find": t("tasks.find")}}/>

    const data = [
        {
            "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
            "date": "Сегодня, 21:00 – 20 июня, 15:00",
            "proposals": 1,
            "diamonds": 1225,
        },

        {
            "title": "Заминтить коллекцию тамагочи NFT",
            "date": "10 июня, 21:00 – 20 июня, 15:00",
            "proposals": 0,
            "diamonds": 100500,
        },
        {
            "title": "Расширение редактируемого стандарта NFT",
            "date": "12 июня, 9:00 – 3 августа, 21:00",
            "proposals": 1,
            "diamonds": 567,
        },
        {
            "title": "Разработка TDA фриланс-биржи (часть II)",
            "date": "10 июня, 21:00 – 20 июня, 15:00",
            "proposals": 1,
            "diamonds": 777,
        },
        {
            "title": "Заминтить коллекцию тамагочи NFT",
            "date": "10 июня, 21:00 – 20 июня, 15:00",
            "proposals": 0,
            "diamonds": 100500,
        },
        {
            "title": "Extend Editable NFT Standard (add features)",
            "date": "12 июня, 9:00 – 3 августа, 21:00",
            "proposals": 1,
            "diamonds": 567,
        },
        {
            "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
            "date": "12 июня, 9:00 – 3 августа, 21:00",
            "proposals": 1,
            "diamonds": 1225,
        },
        {
            "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
            "date": "12 июня, 9:00 – 3 августа, 21:00",
            "proposals": 1,
            "diamonds": 1225,
        },
    ]
    return (
        <Shell miniAppbar={false} header={header}  withDrawer withAuth={false}
               extra={<Filter/>}>

            <div className="h-full p-[20px]">
                <Suspense fallback={<div>Loading...</div>}>
                    <TaskList link="/tasks/1" data={data}/>
                </Suspense>
            </div>
            <Footer transparent={true}>
                <FilterButton>{t("common.filter")}</FilterButton>
            </Footer>
        </Shell>
    );
}
