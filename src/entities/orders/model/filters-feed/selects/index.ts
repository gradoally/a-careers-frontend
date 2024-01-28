import { createEvent, createStore } from "effector";
import {
  type categoriesVariantFeed,
  type languagesVarinatstFeed,
} from "../../../config";

export const $categoryFeed = createStore<categoriesVariantFeed>("");
export const $languageFeed = createStore<languagesVarinatstFeed>("");

export const selectedValueCategory = createEvent<categoriesVariantFeed>();
export const selectedValueLanguage = createEvent<languagesVarinatstFeed>();

$categoryFeed.on(selectedValueCategory, (_, category) => category);
$languageFeed.on(selectedValueLanguage, (_, language) => language);
