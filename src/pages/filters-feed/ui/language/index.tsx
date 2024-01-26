import { useTranslation } from "react-i18next";

import { Header, HeaderBack } from "@/widgets/Header";
import { SelectionValue } from "@/widgets/selection-value";

import {
  $languageFeed,
  selectedValueLanguage,
  languagesValuesFeed,
  languagesVarinatstFeed,
} from "@/entities/orders";

export const FiltersFeedLanguagePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <HeaderBack title={t("home.filter-lang-label")} />
      </Header>

      <SelectionValue<languagesVarinatstFeed>
        $selection={$languageFeed}
        onSelected={selectedValueLanguage}
        varinats={languagesValuesFeed}
        translation="languages"
      />
    </>
  );
};
