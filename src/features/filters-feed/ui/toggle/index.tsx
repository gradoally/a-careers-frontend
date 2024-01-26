import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import s from "./style.module.scss";
import { Hr } from "@/shared/ui/hr";
import { $orderBy, filtersToggles, filterToggleValue } from "@/entities/orders";
import { Checkbox } from "@/shared/ui/checkbox";
import { switchedOrderBy } from "@/entities/orders/model";

export const Toggles = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className={s.title}>{t("home.filter-title")}:</h3>
      <ToggleFilter value={filtersToggles[0]} />
      <Hr theme="linear-gradient" />
      <ToggleFilter value={filtersToggles[1]} />
    </div>
  );
};

interface ToggleFilterProps {
  value: filterToggleValue;
}

const ToggleFilter = ({ value }: ToggleFilterProps) => {
  const stateFilter = useStore($orderBy);
  const { t } = useTranslation();
  const title = `home.${value}`;

  return (
    <button
      className={s.container_toggle}
      onClick={() => switchedOrderBy(value)}
    >
      <label htmlFor={title} className={s.label_toggle}>
        {t(title)}:
      </label>

      <Checkbox id={title} checked={stateFilter === value} />
    </button>
  );
};
