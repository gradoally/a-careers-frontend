import { Input } from "@/shared/ui/input";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import { useStore } from "effector-react";
import { $filterFeedfromPrice, enteredFromPrice } from "@/entities/orders";

export const FromPrice = () => {
  const { t } = useTranslation();
  const fromPriceValue = useStore($filterFeedfromPrice);

  return (
    <div className={s.conatiner}>
      <p className={s.text_ton}>💎</p>
      <Input
        className={s.input}
        placeholder={t("home.filter-amount")}
        onChange={(event) => enteredFromPrice(+event.target.value)}
        value={fromPriceValue}
        type="number"
        min="0"
      />
    </div>
  );
};
