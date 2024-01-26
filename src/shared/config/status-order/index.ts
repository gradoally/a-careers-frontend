export type themeStatus =
  | "without_responses"
  | "average_responses"
  | "large_responses";

export const CLASSES_NAMES_STATUS: Record<themeStatus, themeStatus> = {
  without_responses: "without_responses",
  average_responses: "average_responses",
  large_responses: "large_responses",
};
