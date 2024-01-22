import clsx from "clsx";
import s from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { countResponsesStyle } from "../../lib";

export const PreviewOrders = () => {
  const { t } = useTranslation();
  return (
    <div className={clsx("main", s.containers)}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key) => (
        <div key={key} className={s.wrapper_order}>
          <h3 className={s.order_title}>
            Доработать мета-данные и память смарт-контракта для крутого заказа
          </h3>
          <p className={s.order_deadline}>Сегодня, 21:00 – 20 июня, 15:00</p>
          <p className={s.order_price}>💎 1225</p>
          <div
            className={clsx(
              s.order_count_responses,
              s[countResponsesStyle(key)],
            )}
          >
            {t("home.task-label2")}
            {/* 10 {t('common.feedback')} */}
          </div>
        </div>
      ))}
    </div>
  );
};
