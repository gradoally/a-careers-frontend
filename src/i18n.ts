import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config/config";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale: locale as string,
    messages: (
      await (locale === "ru"
        ? // When using Turbopack, this will enable HMR for `DEFAULT_LOCALE`
          import(`./config/messages/ru.json`)
        : import(`./config/messages/${locale}.json`))
    ).default,
  };
});
