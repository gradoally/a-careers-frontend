import { useTranslation } from "react-i18next";

import { Input } from "@/shared/ui/input";

export const SearchOrders = () => {
  const { t } = useTranslation();
  return <Input theme="search-orders" placeholder={t("menu-page.menu.cat3")} />;
};
