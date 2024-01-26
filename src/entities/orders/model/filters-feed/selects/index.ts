import { createEvent, createStore } from "effector";
import {
  type categoriesVariantFeed,
  type languagesVarinatstFeed,
} from "../../../config";

export const $categoryFeed = createStore<categoriesVariantFeed>("allOrders");
export const $languageFeed = createStore<languagesVarinatstFeed>("allLang");

export const selectedValueCategory = createEvent<categoriesVariantFeed>();
export const selectedValueLanguage = createEvent<languagesVarinatstFeed>();

$categoryFeed.on(selectedValueCategory, (_, category) => category);
$languageFeed.on(selectedValueLanguage, (_, language) => language);
