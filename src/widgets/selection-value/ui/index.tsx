import { Event, Store } from "effector";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import { Button } from "@/shared/ui/button";
import { categoriesVarinats, languagesVarinats } from "@/entities/orders";

type varinats = categoriesVarinats | languagesVarinats;
interface SelectionValueProps {
  title_page: string;
  $selection: Store<varinats>;
  onSelected: Event<varinats>;
  varinats: varinats[];
}

export const SelectionValue = ({
  title_page,
  $selection,
  onSelected,
  varinats,
}: SelectionValueProps) => {
  const { t } = useTranslation();
  const selection = useStore($selection);

  return (
    <div className={s.container}>
      <h1 className={s.page_title}>{t(title_page)}</h1>

      <div>
        {varinats.map((select) => (
          <Button
            onClick={() => onSelected(select)}
            theme="large"
            className={s.variants}
            isActive={selection === select}
            key={select}
          >
            {/* replace */}
            {t(`categories.${select}`)}
          </Button>
        ))}
      </div>
    </div>
  );
};
