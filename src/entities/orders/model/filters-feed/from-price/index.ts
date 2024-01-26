import { createEvent, createStore, sample } from "effector";

export const $filterFeedfromPrice = createStore<string>("");

export const enteredFromPrice = createEvent<number>();

sample({
  clock: enteredFromPrice,
  filter: Number.isFinite,
  fn: String,
  target: $filterFeedfromPrice,
});
