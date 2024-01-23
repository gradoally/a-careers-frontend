import { Link } from "atomic-router-react";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

import { filtersVariantsI } from "../../../config";
import s from "./style.module.scss";

import next_icon from "@/shared/assets/next.svg";

export const FiltersOrdersVariant = ({
  icon,
  title,
  link,
  $chooseFilter,
}: filtersVariantsI) => {
  const { t } = useTranslation();
  const value = useStore($chooseFilter);

  return (
    <Link to={link} className={s.container}>
      <div className={s.left_content}>
        <h3 className={s.title_icon_filters}>{icon}</h3>
        <div>
          <p className={s.title_filters}>{t(title)}</p>
          <p className={s.value_filters}>{t(value)}</p>
        </div>
      </div>

      <img src={next_icon} alt="Next" />
    </Link>
  );
};
