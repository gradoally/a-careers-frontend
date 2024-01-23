import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import s from "./style.module.scss";
import { Hr } from "@/shared/ui/hr";
import { filterTogglesI, filtersToggles } from "../../../config";
import { Checkbox } from "@/shared/ui/checkbox";

export const Sort = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className={s.title}>{t("home.filter-title")}</h3>
      <ToggleFilter {...filtersToggles[0]} />
      <Hr theme="linear-gradient" />
      <ToggleFilter {...filtersToggles[1]} />
    </div>
  );
};

const ToggleFilter = ({
  title,
  $stateFilter,
  toggleFilter,
}: filterTogglesI) => {
  const stateFilter = useStore($stateFilter);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={s.container_toggle} onClick={() => toggleFilter()}>
      <label htmlFor={title} className={s.label_toggle}>
        {title}
      </label>

      <Checkbox id={title} checked={stateFilter} />
    </div>
  );
};
