import { useMessages, NextIntlClientProvider, useLocale } from "next-intl";
import pick from "lodash/pick";

import FilterContent from "./FilterContent";

const Filter = () => {
    const locale = useLocale();
    const messages = useMessages();
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={pick(messages,'tasks', 'filter', 'locale_switcher')}
        >
            <FilterContent />
        </NextIntlClientProvider>
    )
}

export default Filter;
