import { Selects } from "./selects";

import s from "./style.module.scss";
import { FromPrice } from "./from-price";
import { Hr } from "@/shared/ui/hr";
import { Toggles } from "./toggle";
import { useTranslation } from "react-i18next";
import { Submit } from "@/shared/ui/submit";
import { onClickedFilterFeed } from "@/entities/orders";

export const FiltersFeed = () => {
  const { t } = useTranslation();

  return (
    <>
      <main className="main">
        <div className={s.content}>
          <Selects />

          <FromPrice />
        </div>

        <Hr />

        <div className={s.content}>
          <Toggles />
        </div>

        <Hr className={s.border_bottom_filter} />
      </main>

      <Submit
        onClick={onClickedFilterFeed}
        submit_text={t("home.submit-filter", { count: 77 })}
      />
    </>
  );
};

export { SearchOrders } from "./search-orders";
