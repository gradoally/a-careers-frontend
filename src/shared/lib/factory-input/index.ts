import { createEvent, createStore } from "effector";

export const factoryInput = () => {
  const $input = createStore("");
  const changedInput = createEvent<string>();

  $input.on(changedInput, (_, new_value) => new_value);

  return { $input, changedInput };
};
