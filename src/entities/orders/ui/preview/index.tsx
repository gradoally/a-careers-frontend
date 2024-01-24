import clsx from "clsx";
import s from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { Hr } from "@/shared/ui/hr";
import { Link } from "atomic-router-react";
import { routes } from "@/shared/config/router";
import { Status } from "@/shared/ui/status";
import { getClassStatus } from "@/shared/lib/get-class-status";

export const PreviewOrders = () => {
  const { t } = useTranslation();
  return (
    <div className={clsx("main", s.container)}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key: number) => (
        <Link
          to={routes.order}
          params={{ orderId: key.toString() }}
          key={key}
          className={s.wrapper_order}
        >
          <h3 className={s.order_title}>
            Доработать мета-данные и память смарт-контракта для крутого заказа
          </h3>
          <p className={s.order_deadline}>Сегодня, 21:00 – 20 июня, 15:00</p>
          <p className={s.order_price}>💎 1225</p>

          <Status theme={getClassStatus(key)}>
            {t("home.task-label2")}
            {/* 10 {t('common.feedback')} */}
          </Status>

          <Hr className={s.hr} theme="linear-gradient" />
        </Link>
      ))}
    </div>
  );
};
