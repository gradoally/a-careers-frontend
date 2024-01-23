import { FiltersOrders } from "@/entities/orders";
import { routes } from "@/shared/config/router";
import { Header, HeaderBack } from "@/widgets/Header";
import { useTranslation } from "react-i18next";

export const FiltersOrdersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header>
        <HeaderBack title={t("home.filters")} to={routes.main} />
      </Header>

      <FiltersOrders />
    </>
  );
};
