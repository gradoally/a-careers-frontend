export const setTimeoutForMock = async (seconds?: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds ?? 2000));
};
