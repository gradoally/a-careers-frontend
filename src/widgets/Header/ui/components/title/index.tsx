import { useTranslation } from "react-i18next";

import s from "./style.module.scss";

interface HeaderTitlesProps {
  large_text?: string;
  mini_text: string;
}

export const HeaderTitles = ({ large_text, mini_text }: HeaderTitlesProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.container_title_center}>
      {large_text && <p className={s.large_title}>{t(large_text)}</p>}

      <p className={s.mini_title}>{t(mini_text)}</p>
    </div>
  );
};
