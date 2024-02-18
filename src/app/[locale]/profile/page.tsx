import {NextIntlClientProvider, useMessages} from 'next-intl';
import React, {Suspense} from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import Content from "@/app/[locale]/profile/content";
import pick from "lodash/pick";
import {locales} from "@/config";

type Props = {
    params: {
        locale: string;
    };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

const Page = ({params: {locale}}: Props) => {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    const messages = useMessages();


    const data = {
        nickname: "@new_user",
        address: "EQCISAJu…W_JqYM3t",
        telegram: "@some_wallet",
        about: "🎯 dApp любой сложности\n" +
            "💎 Премиум дизайн (UI/UX)!\n" +
            "⚙️ Адаптивная верстка – на профессиональном уровне!🏆 Золотой партнёр «1С-Битрикс» (нет) !\n" +
            "\n" +
            "✔️ Blockchain-продвижение сайтов на лидирующие позиции. Взлом рынков, соц. инжинеринг",
        websitesite: "my-little-studio.ton",
        portfolio: "https://github.com/somewallet",
        resume: "https://github.com/somewallet",
        specialization: "FunC,FIFT,Toncenter API",
    }


    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, 'profile', 'network')}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <Content user={data}/>
            </Suspense>
        </NextIntlClientProvider>
    )
}

export default Page;