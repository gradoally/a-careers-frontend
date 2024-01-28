import { useTranslation } from "react-i18next";

import { Input } from "@/shared/ui/input";
import { useStore } from "effector-react";
import { $search, changedSearch } from "@/entities/orders";

export const SearchOrders = () => {
  const { t } = useTranslation();
  const value = useStore($search);

  return (
    <Input
      value={value}
      onChange={(event) => changedSearch(event.target.value)}
      theme="search-orders"
      placeholder={t("menu-page.menu.cat3")}
    />
  );
};
