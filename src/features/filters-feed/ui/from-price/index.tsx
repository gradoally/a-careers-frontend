import { Input } from "@/shared/ui/input";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";

export const FromPrice = () => {
  const { t } = useTranslation();

  return (
    <div className={s.conatiner}>
      <p className={s.text_ton}>💎</p>
      <Input
        className={s.input}
        placeholder={t("home.filter-amount")}
        type="number"
        min={0}
      />
    </div>
  );
};
