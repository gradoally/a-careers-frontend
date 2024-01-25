import { createEvent, createStore } from "effector";
import {
  type categoriesVarinats,
  type languagesVarinats,
  filterToggleValue,
} from "../../config";

export const selectedValueCategory = createEvent<categoriesVarinats>();
export const selectedValueLanguage = createEvent<languagesVarinats>();

export const $category = createStore<categoriesVarinats>("allOrders");
export const $language = createStore<languagesVarinats>("allLang");

$category.on(selectedValueCategory, (_, category) => category);

$language.on(selectedValueLanguage, (_, language) => language);

export const switchedOrderBy = createEvent<filterToggleValue>();
export const clickedToggleUrgency = createEvent();

export const $orderBy = createStore<filterToggleValue>("createdAt");

$orderBy.on(switchedOrderBy, (_, paylod) => paylod);
