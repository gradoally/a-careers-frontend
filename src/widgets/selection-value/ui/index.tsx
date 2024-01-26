import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import { Button } from "@/shared/ui/button";
import { SelectionValueProps } from "../config";

export function SelectionValue<variantsT>({
  translation,
  $selection,
  onSelected,
  varinats,
}: SelectionValueProps<variantsT>) {
  const { t } = useTranslation();
  const selection = useStore($selection);

  return (
    <div className={s.container}>
      <h1 className={s.page_title}>{t(`${translation}.title`)}</h1>

      <div>
        {varinats.map((select) => (
          <Button
            onClick={() => onSelected(select)}
            theme="large"
            className={s.variants}
            isActive={selection === select}
            key={select as string}
          >
            {/* replace */}
            {t(`${translation}.${select}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
