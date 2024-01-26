import { TFunction } from "i18next";

export const getTextCountResponses = (
  count_responses: number,
  t: TFunction<"translation", undefined>,
) => {
  if (count_responses > 0) {
    return `${count_responses} ${t("common.feedback")}`;
  }
  return t("home.task-label2");
};
