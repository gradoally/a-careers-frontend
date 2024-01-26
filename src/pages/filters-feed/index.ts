import { namedLazy } from "@/shared/lib/lazy-load";

import { mainRoute, categoryRoute, languageRoute } from "./model";

const FiltersFeedPage = namedLazy(
  async () => await import("./ui"),
  "FiltersFeedPage",
);

export const FiltersFeedRoute = {
  view: FiltersFeedPage,
  route: mainRoute,
};

const FiltersFeedCategoryPage = namedLazy(
  async () => await import("./ui"),
  "FiltersFeedCategoryPage",
);

export const FiltersFeedCategoryRoute = {
  view: FiltersFeedCategoryPage,
  route: categoryRoute,
};

const FiltersFeedLanguagePage = namedLazy(
  async () => await import("./ui"),
  "FiltersFeedLanguagePage",
);

export const FiltersFeedLanguageRoute = {
  view: FiltersFeedLanguagePage,
  route: languageRoute,
};
