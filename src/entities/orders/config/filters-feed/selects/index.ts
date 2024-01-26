import { $categoryFeed, $languageFeed } from "../../../model";
import { routes } from "@/shared/router";
import type {
  filterFeedSelectsI,
  categoriesVariantFeed,
  languagesVarinatstFeed,
} from "./index.type";

export const filterFeedSelects: [
  filterFeedSelectsI<categoriesVariantFeed>,
  filterFeedSelectsI<languagesVarinatstFeed>,
] = [
  {
    icon: "🧩",
    title: "home.filter-category",
    translation: "categories",
    link: routes.filters_feed_category,
    $chooseFilter: $categoryFeed,
  },
  {
    icon: "🌎",
    title: "home.filter-lang-label",
    translation: "languages",
    link: routes.filters_feed_language,
    $chooseFilter: $languageFeed,
  },
];

export { categoriesValuesFeed, languagesValuesFeed } from "./variants";
export type {
  categoriesVariantFeed,
  languagesVarinatstFeed,
  filterFeedSelectsI,
};
