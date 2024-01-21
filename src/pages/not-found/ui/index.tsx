import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

import cls from "./style.module.scss";
import { Button } from "@/shared/ui/button";
import { Page } from "@/shared/config/types";

export const NotFoundPage = (): Page => {
  const { t } = useTranslation();

  return (
    <div data-testid="NotFoundPage" className={clsx(cls.NotFoundPage, {}, [])}>
      {t("Страница не найдена")}
    </div>
  );
};
