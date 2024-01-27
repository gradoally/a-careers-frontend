import { TFunction } from "i18next";

export const getTextCountResponses = (
  count_responses: number,
  t: TFunction<"translation", undefined>,
) => {
  let text: string;
  if (count_responses > 0) {
    text = `${count_responses} ${t("common.feedback")}`;
  }
  text = t("home.task-label2") as string;

  return text.toLocaleUpperCase();
};
