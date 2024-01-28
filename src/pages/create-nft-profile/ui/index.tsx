import { Header } from "@/widgets/Header";

import s from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { CreateNftProfile } from "@/features/create-nft-profile";

export const CreateNftProfilePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header className={s.header}>
        <p className={s.page_title}>{t("common.create-profile")}</p>
      </Header>

      <CreateNftProfile />
    </>
  );
};
