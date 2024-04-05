import { NextIntlClientProvider, useMessages, useTranslations, useLocale } from 'next-intl';
import pick from "lodash/pick";

import DrawerContent from "@/components/layout/drawer/DrawerContent";

const Drawer = () => {
    const trans = useTranslations("tasks");
    const messages = useMessages();
    const locale = useLocale();

    const routes = [
        { "label": trans("create"), "to": "/tasks/create", secure: false, disable: true },
        { "label": trans("find"), "to": "/", secure: false, disable: false },
        { "label": trans("my"), "to": "/tasks/my", secure: true, disable: false },
    ]
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, "locale_switcher", "common")}
        >
            <DrawerContent routes={routes} />
        </NextIntlClientProvider>
    )
}

export default Drawer;
