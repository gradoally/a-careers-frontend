import { STYLE_RESPONSES } from "../../config";

export const countResponsesStyle = (count: number) => {
  if (count === 0) {
    console.log("without_responses");
    return STYLE_RESPONSES.without_responses;
  }
  if (count > 0 && count <= 5) {
    return STYLE_RESPONSES.average_responses;
  }
  if (count > 5) {
    return STYLE_RESPONSES.large_responses;
  }
  return STYLE_RESPONSES.large_responses;
};
