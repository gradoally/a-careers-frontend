import { router } from "@/shared/config/router";
import { Page } from "@/shared/config/types";
import { Header, HeaderBack, OpenMenu } from "@/widgets/Header";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";

export const OrderPage = (): Page => {
  const { t } = useTranslation();
  const activeRoute = useStore(router.$activeRoutes);
  const { orderId } = useStore(activeRoute[0].$params);

  return (
    <>
      <Header>
        <HeaderBack title={`${t(`common.task1`)} #${orderId}`} />

        <OpenMenu />
      </Header>
    </>
  );
};
