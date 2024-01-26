import { setTimeoutForMock } from "@/shared/lib/developing";
import { createQuery } from "@farfetched/core";

export const getQueryWrapper = createQuery({
  handler: async () => {
    await setTimeoutForMock();

    return null;
  },
});
