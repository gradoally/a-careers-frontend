import { RouteInstance } from "atomic-router";
import { Store } from "effector";

export interface filterFeedSelectsI<variantsT> {
  icon: "🧩" | "🌎";
  title: string;
  translation: string;
  link: RouteInstance<object>;
  $chooseFilter: Store<variantsT>;
}

export type categoriesVariantFeed =
  | "allOrders"
  | "turnkeyProject"
  | "smartContracts"
  | "telegramBotsTwa"
  | "websites"
  | "backend"
  | "design"
  | "frontend"
  | "NFTCollections"
  | "writingTexts";

export type languagesVarinatstFeed = "allLang" | "inRussian" | "inEnglish";
