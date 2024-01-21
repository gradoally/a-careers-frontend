import { useTranslation } from "react-i18next";

export const ToggleLanguage = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  const toggle = (): void => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <div data-testid="toggle-language">
      <button type="button" onClick={toggle}>
        {t("toggleLang")}
      </button>
    </div>
  );
};
