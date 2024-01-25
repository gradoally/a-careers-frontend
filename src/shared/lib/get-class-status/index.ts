import { CLASSES_NAMES_STATUS } from "@/shared/config/status-order";
import { themeStatus } from "@/shared/config/status-order";

export const getClassStatus = (count: number): themeStatus => {
  if (count === 0) {
    return CLASSES_NAMES_STATUS.without_responses;
  }
  if (count > 0 && count <= 5) {
    return CLASSES_NAMES_STATUS.average_responses;
  }
  if (count > 5) {
    return CLASSES_NAMES_STATUS.large_responses;
  }
  return CLASSES_NAMES_STATUS.large_responses;
};
