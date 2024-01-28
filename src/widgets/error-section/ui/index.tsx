import { Submit } from "@/shared/ui/submit";
import { Header, HeaderBack } from "@/widgets/Header";
import clsx from "clsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";

interface ErrorSectionProps {
  children: ReactNode;
  onNavigate: () => void;
}

export const ErrorSection = ({ children, onNavigate }: ErrorSectionProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <HeaderBack title="404" />
      </Header>

      <main className={clsx("main", s.main_section)}>
        <div className={s.content}>
          <h1 className={s.title}>404</h1>
          <p className={s.description}>{children}</p>
        </div>
      </main>

      <Submit
        submit_text={t("common.back")}
        onClick={onNavigate}
        // onClick={() => routes.main.open()}
      />
    </>
  );
};
