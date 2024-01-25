import { Store } from "effector";

import { $category, $language } from "../../../model";
import { routes } from "@/shared/config/router";
import { RouteInstance } from "atomic-router";

export interface filterSelectsI {
  icon: "🧩" | "🌎";
  title: string;
  translation: string;
  link: RouteInstance<object>;
  $chooseFilter: Store<string>;
}

export const filtersSelects: filterSelectsI[] = [
  {
    icon: "🧩",
    title: "home.filter-category",
    translation: "categories",
    link: routes.filters_feed_category,
    $chooseFilter: $category,
  },
  {
    icon: "🌎",
    title: "home.filter-lang-label",
    translation: "languages",
    link: routes.filters_feed_language,
    $chooseFilter: $language,
  },
];

export { categoriesFilters, languagesFilters } from "./variants";
export type { categoriesVarinats, languagesVarinats } from "./index.type";
