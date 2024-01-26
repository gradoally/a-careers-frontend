import { useTranslation } from "react-i18next";

import { Header, HeaderBack } from "@/widgets/Header";
import { SelectionValue } from "@/widgets/selection-value";
import {
  $categoryFeed,
  selectedValueCategory,
  categoriesValuesFeed,
  categoriesVariantFeed,
} from "@/entities/orders";

export const FiltersFeedCategoryPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <HeaderBack title={t("home.filter-category")} />
      </Header>

      <SelectionValue<categoriesVariantFeed>
        $selection={$categoryFeed}
        onSelected={selectedValueCategory}
        varinats={categoriesValuesFeed}
        translation="categories"
      />
    </>
  );
};
