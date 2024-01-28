import i18n from "@/shared/config/i18n";

function formatTwoDigits(number: number) {
  return number < 10 ? "0" + number : number;
}

export const transformDate = (date: string) => {
  const now = new Date(date);
  const current_year = new Date().getFullYear();

  const fullYear_order = now.getFullYear();
  const fullYear =
    current_year === fullYear_order ? "," : ` ${fullYear_order},`;
  const day = now.getDate();
  const hours = formatTwoDigits(now.getHours());
  const minutes = formatTwoDigits(now.getMinutes());

  const currentLocale = i18n.language;
  const month = getAbbreviatedMonthName(now.getMonth() + 1, currentLocale);

  return `${day} ${month}${fullYear} ${hours}:${minutes}`;
};

function getAbbreviatedMonthName(monthIndex: number, locale: string) {
  const date = new Date(2000, monthIndex, 1);
  return new Intl.DateTimeFormat(locale, { month: "short" }).format(date);
}
