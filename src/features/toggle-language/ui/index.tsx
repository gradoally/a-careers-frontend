import { useTranslation } from "react-i18next";

import s from "./style.module.scss";

export const ToggleLanguage = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  const toggle = (): void => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <button className={s.toggle_lang} onClick={toggle}>
      {t("toggleLang")}
    </button>
  );
};
