import { FiltersOrders } from "@/entities/orders";
import { Header, HeaderBack } from "@/widgets/Header";
import { useTranslation } from "react-i18next";

export const FiltersOrdersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header>
        <HeaderBack title={t("home.filters")} />
      </Header>

      <FiltersOrders />
    </>
  );
};
