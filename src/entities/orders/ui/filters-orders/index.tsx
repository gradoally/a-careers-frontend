import { FiltersOrdersVariant } from "./variants";
import { filtersVariants } from "../../config";

import s from "./style.module.scss";
import { FromPrice } from "./from-price";
import { Hr } from "@/shared/ui/hr";
import { Sort } from "./sort";
import { useTranslation } from "react-i18next";
import { Submit } from "@/shared/ui/submit";

export const FiltersOrders = () => {
  const { t } = useTranslation();
  return (
    <>
      <main className="main">
        <div className={s.content}>
          {filtersVariants.map((filterArgument) => (
            <FiltersOrdersVariant {...filterArgument} />
          ))}

          <FromPrice />
        </div>

        <Hr />

        <div className={s.content}>
          <Sort />
        </div>

        <Hr className={s.hr_filter_bottom} />
      </main>

      <Submit submit_text={t("home.submit-filter", { count: 77 })} />
    </>
  );
};
