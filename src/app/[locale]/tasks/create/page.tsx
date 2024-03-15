"use client"
import React, { Fragment, useState } from "react";

import pick from 'lodash/pick';
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server";

import { locales } from "@/config/config";
import Stepper from "./stepper";
import TransactionProgress from "@/components/Progress/TransactionProgress";

type Props = {
    params: {
        category: string;
        locale: string;
    };
};


/*export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}*/

const Page = () => {
    // Enable static rendering
    const locale = useLocale();
    //unstable_setRequestLocale(locale);

    const messages = useMessages();
    const [transaction, setTransaction] = useState(false);
    return (
        <Fragment>
            <Stepper toggleProgress={() => setTransaction(!transaction)} />
            {transaction && <TransactionProgress />}
        </Fragment>
    )
}

export default Page;
