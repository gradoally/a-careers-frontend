import { Event, Store } from "effector";
// import { categoriesVariantFeed, languagesVarinatstFeed } from "@/entities/orders";

// type varinats = categoriesVariantFeed | languagesVarinatstFeed;
export interface SelectionValueProps<variantsT> {
  translation: string;
  $selection: Store<variantsT>;
  onSelected: Event<variantsT>;
  varinats: variantsT[];
}
