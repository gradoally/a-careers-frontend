import { createEvent, createStore } from "effector";
import { debounce } from "patronum";

export const factoryInput = () => {
  const $input = createStore("");
  const changedInput = createEvent<string>();
  const debouncedInput = debounce(changedInput, 400);

  $input.on(changedInput, (_, new_value) => new_value);

  return { $input, changedInput, debouncedInput };
};
