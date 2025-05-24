import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config/config";

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate that the incoming `locale` parameter is valid
  let locale = await requestLocale;
  if (!locales.includes(locale as any)) notFound();

  return {
    locale: locale as string,
    messages: (
      await import(`./config/messages/${locale}.json`)
    ).default,
  };
});
