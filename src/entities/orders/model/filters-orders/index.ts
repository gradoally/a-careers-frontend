import { createEvent, createStore } from "effector";

export const clickedToggleDate = createEvent();
export const clickedToggleUrgency = createEvent();

export const $categories = createStore("");
export const $language = createStore("");

export const $dateOfPublication = createStore(false).on(
  clickedToggleDate,
  (state) => !state,
);

export const $urgencyOfPublication = createStore(false).on(
  clickedToggleUrgency,
  (state) => !state,
);
