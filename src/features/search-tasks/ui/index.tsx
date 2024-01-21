import { useTranslation } from "react-i18next";
import "./style.module.scss";

import { Input } from "@/shared/ui/input";

export const SearchTasks = () => {
  const { t } = useTranslation();
  return <Input theme="search-tasks" placeholder={t("menu-page.menu.cat3")} />;
};
