import { PreviewOrders } from "@/entities/orders";
import { Page } from "@/shared/config/types";
import { Button } from "@/shared/ui/button";
import { Header } from "@/widgets/Header";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import filter_icon from "./image/filter.svg";

export const MainPage = (): Page => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <PreviewOrders />
      <Button className={s.filter_link}>
        {t("home.filter-btn")}
        <img src={filter_icon} alt="" />
      </Button>
    </>
  );
};
