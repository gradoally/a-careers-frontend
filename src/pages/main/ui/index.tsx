import { useTranslation } from "react-i18next";

import { FeedOrders } from "@/entities/orders";
import { Page } from "@/shared/config/types";
import { Button } from "@/shared/ui/button";
import { Header, OpenMenu } from "@/widgets/Header";

import { SearchOrders } from "@/features/filters-feed";
import { ConnectWallet } from "@/features/connect-wallet";

import s from "./style.module.scss";
import filter_icon from "./image/filter.svg";
import { Link } from "atomic-router-react";
import { routes } from "@/shared/router";

export const MainPage = (): Page => {
  const { t } = useTranslation();
  return (
    <>
      <Header>
        <OpenMenu />
        <SearchOrders />

        <ConnectWallet />
      </Header>

      <FeedOrders />

      <Link to={routes.filters_feed}>
        <Button className={s.filter_link}>
          {t("home.filter-btn")}
          <img src={filter_icon} alt="" />
        </Button>
      </Link>
    </>
  );
};
