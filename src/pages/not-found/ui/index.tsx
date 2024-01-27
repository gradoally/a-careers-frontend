import { useTranslation } from "react-i18next";

import { Page } from "@/shared/config/types";
import { ErrorSection } from "@/widgets/error-section";
import { router } from "@/shared/router";

export const NotFoundPage = (): Page => {
  const { t } = useTranslation();

  return (
    <ErrorSection onNavigate={() => router.back()}>
      {t("not-found")}
    </ErrorSection>
  );
};
