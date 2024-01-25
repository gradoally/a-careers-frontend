import { useTranslation } from "react-i18next";

import { Header, HeaderBack } from "@/widgets/Header";
import { SelectionValue } from "@/widgets/selection-value";

import {
  $language,
  selectedValueLanguage,
  languagesFilters,
} from "@/entities/orders";

export const FiltresFeedLanguagePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <HeaderBack title={t("home.filter-lang-label")} />
      </Header>

      <SelectionValue
        title_page="create-task-page.first-step-page.title"
        $selection={$language}
        onSelected={selectedValueLanguage}
        varinats={languagesFilters}
      />
    </>
  );
};
