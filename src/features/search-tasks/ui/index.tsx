import { useTranslation } from "react-i18next";

import { Input } from "@/shared/ui/input";

export const SearchTasks = () => {
  const { t } = useTranslation();
  return <Input theme="search-tasks" placeholder={t("menu-page.menu.cat3")} />;
};
