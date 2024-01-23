import { Header, IconTitle, RowWrapper } from "@/widgets/Header";
import { ConnectWallet } from "@/features/connect-wallet";
import { Close } from "@/widgets/Header/ui";
import clsx from "clsx";

import s from "./style.module.scss";
import { MenuLinks } from "../config";
import { Link } from "atomic-router-react";
import { useTranslation } from "react-i18next";
import { ToggleLanguage } from "@/features/toggle-language";
import { LINK_TELEGRAM_SUPPORT } from "@/shared/config/router";

const keyTranslation = "menu-page.menu.cat";

export const MenuPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header>
        <IconTitle />
        <RowWrapper gap="10">
          <ConnectWallet />
          <Close />
        </RowWrapper>
      </Header>

      <div className={clsx("main", s.container_links)}>
        {MenuLinks.map((to, index) => (
          <Link
            to={to}
            className={clsx(s.links)}
            key={`${keyTranslation}${index}`}
          >
            {t(`${keyTranslation}${index + 1}`)}
          </Link>
        ))}
      </div>

      <footer className={s.footer}>
        <Link to={LINK_TELEGRAM_SUPPORT} className={s.link_to_support}>
          {t("menu-page.menu-footer.support")}
        </Link>
        <ToggleLanguage />
      </footer>
    </>
  );
};
