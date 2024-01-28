import { router } from "@/shared/router";
import { Page } from "@/shared/config/types";
import { Header, HeaderBack, HeaderOpenMenu } from "@/widgets/Header";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

import { orderLoadedRoute } from "@/entities/orders";
import { OrderDataWidget, OrderLoadingWidget } from "@/widgets/order";

export const OrderPage = (): Page => {
  const { t } = useTranslation();
  const activeRoute = useStore(router.$activeRoutes);
  const { orderId } = useStore(activeRoute[0].$params);

  const isorderLoadedRouteOpened = useStore(orderLoadedRoute.$isOpened);

  return (
    <>
      <Header>
        <HeaderBack title={`${t(`common.task1`)} #${orderId}`} />

        <HeaderOpenMenu />
      </Header>

      {isorderLoadedRouteOpened ? <OrderDataWidget /> : <OrderLoadingWidget />}
    </>
  );
};
