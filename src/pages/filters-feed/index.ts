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

const FiltresFeedCategoryPage = namedLazy(
  async () => await import("./ui"),
  "FiltresFeedCategoryPage",
);

export const FiltresFeedCategoryRoute = {
  view: FiltresFeedCategoryPage,
  route: categoryRoute,
};

const FiltresFeedLanguagePage = namedLazy(
  async () => await import("./ui"),
  "FiltresFeedLanguagePage",
);

export const FiltresFeedLanguageRoute = {
  view: FiltresFeedLanguagePage,
  route: languageRoute,
};
