import { useTranslation } from "react-i18next";

import { Header, HeaderBack } from "@/widgets/Header";
import { SelectionValue } from "@/widgets/selection-value";
import {
  $category,
  selectedValueCategory,
  categoriesFilters,
} from "@/entities/orders";

export const FiltresFeedCategoryPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <HeaderBack title={t("home.filter-category")} />
      </Header>

      <SelectionValue
        title_page="create-task-page.first-step-page.title"
        $selection={$category}
        onSelected={selectedValueCategory}
        varinats={categoriesFilters}
      />
    </>
  );
};
