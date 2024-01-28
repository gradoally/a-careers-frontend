import { router } from "@/shared/router";
import { Page } from "@/shared/config/types";
import { Header, HeaderBack, HeaderOpenMenu } from "@/widgets/Header";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

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

export const OrderPage = (): Page => {
  const { t } = useTranslation();
  const activeRoute = useStore(router.$activeRoutes);
  const { orderId } = useStore(activeRoute[0].$params);

  return (
    <>
      <Header>
        <HeaderBack title={`${t(`common.task1`)} #${orderId}`} />

        <HeaderOpenMenu />
      </Header>

      <div className={clsx("main", s.container)}>
        <Status
          theme={getClassStatus(ORDER_MOCK.status.count_responses)}
          className={s.status}
        >
          {t("home.task-label2")}
        </Status>

        <h1 className={s.title}>
          Доработать мета-данные и память смарт-контракта
        </h1>

        <p className={s.price}>💎 {ORDER_MOCK.price}</p>

        <Address address={ORDER_MOCK.address_contract} />

        <ColumnContent title={t("task-detail.description")}>
          Необходимо доработать смарт-контракт таким образом, что бы при деплое
          он хранил ссылку на одни метаданные, а после передачи собственности с
          кошелька владельца метаданные менялись на другие. Изначально элементы
          коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи
          на маркетплейсе у владельца должен появиться.
        </ColumnContent>

        <DownloadTechTask
          file_name="some_awesome_project.pdf"
          file_url="some_awesome_project.pdf"
        />

        <ColumnContent title={t("task-detail.begin")}>
          10 июня, 15:00
        </ColumnContent>

        <ColumnContent title={t("task-detail.finish")}>
          21 июня, 21:00
        </ColumnContent>

        <Hr theme="linear-gradient" className={s.hr} />

        <div className={s.details_order}>
          <p>Создано 7 июня в 16:53 на русском языке</p>
          <p>Категория «Разработка на блокчейне TON»</p>
        </div>

        <ProfileForOrder />
      </div>

      <Submit submit_text={`${t("task-detail.buttons.login-and-respond")}⚡`} />
    </>
  );
};
