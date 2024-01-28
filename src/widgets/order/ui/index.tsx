import s from "./style.module.scss";
import { Hr } from "@/shared/ui/hr";
import { Status } from "@/shared/ui/status";
import { getClassStatus } from "@/shared/lib/get-class-status";
import { Address } from "@/shared/ui/column-content";
import { ColumnContent, DownloadTechTask } from "@/shared/ui/column-content";
import { ProfileForOrder } from "@/entities/user";
import clsx from "clsx";
import { Submit } from "@/shared/ui/submit";
import { ORDER_MOCK } from "@/shared/api";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useStore } from "effector-react";
import { $order } from "@/entities/orders";
import { transformDate } from "@/shared/lib/formatted-date";

export const OrderDataWidget = memo(() => {
  const { t } = useTranslation();
  const order = useStore($order);

  if (!order?.title) return null;

  return (
    <>
      <div className={clsx("main", s.container)}>
        <Status
          theme={getClassStatus(ORDER_MOCK.status.count_responses)}
          className={s.status}
        >
          {t("home.task-label2")}
        </Status>

        <h1 className={s.title}>{order.title}</h1>

        <p className={s.price}>💎 {order.price}</p>

        <Address address={order.contract_address} />

        <ColumnContent title={t("task-detail.description")}>
          {order.description}
        </ColumnContent>

        <DownloadTechTask
          file_name={order.technicalTask.name}
          file_url={order.technicalTask.link}
        />

        <ColumnContent title={t("task-detail.begin")}>
          {transformDate(order.date.createdAt)}
        </ColumnContent>

        <ColumnContent title={t("task-detail.finish")}>
          {transformDate(order.date.deadline)}
        </ColumnContent>

        <Hr theme="linear-gradient" className={s.hr} />

        <div className={s.details_order}>
          <p>Создано на русском языке</p>
          <p>Категория «{order.category}»</p>
        </div>

        <ProfileForOrder />
      </div>

      <Submit submit_text={`${t("task-detail.buttons.login-and-respond")}⚡`} />
    </>
  );
});

export { OrderLoadingWidget } from "./skeleton";
