import { useTranslation } from "react-i18next";

import { Page } from "@/shared/config/types";
import { ErrorSection } from "@/widgets/error-section";
import { routes } from "@/shared/router";

export const ErrorBoundryPage = (): Page => {
  const { t } = useTranslation();

  return (
    <ErrorSection onNavigate={() => routes.main.open()}>
      {t("page-error")}
    </ErrorSection>
  );
};
