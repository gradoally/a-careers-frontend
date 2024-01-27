import { FiltersFeed } from "@/features/filters-feed";
import { Header, HeaderBack } from "@/widgets/Header";
import { useTranslation } from "react-i18next";

export const FiltersFeedPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header>
        <HeaderBack title={t("home.filters")} />
      </Header>

      <FiltersFeed />
    </>
  );
};

export { FiltersFeedCategoryPage } from "./category";
export { FiltersFeedLanguagePage } from "./language";