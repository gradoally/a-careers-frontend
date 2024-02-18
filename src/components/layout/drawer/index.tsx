
import {NextIntlClientProvider, useMessages, useTranslations, useLocale} from 'next-intl';
import pick from "lodash/pick";


import DrawerContent from "@/components/layout/drawer/DrawerContent";

const Drawer = ({withAuth}: { withAuth?: boolean }) => {
    const t = useTranslations("tasks");
    const messages = useMessages();
    const locale = useLocale();

    const routes = [
        {"label": t("create"), "to": "/tasks/create"},
        {"label": t("find"), "to": "/"},
        {"label": t("my"), "to": "/tasks/my"},
    ]
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages, "locale_switcher", "common")}
        >
            <DrawerContent
                withAuth={withAuth}
                routes={routes}/>
        </NextIntlClientProvider>
    )
}

export default Drawer;
