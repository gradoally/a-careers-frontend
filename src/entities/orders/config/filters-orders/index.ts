import { Store, Event } from "effector";
import {
  $categories,
  $language,
  $dateOfPublication,
  $urgencyOfPublication,
  clickedToggleDate,
  clickedToggleUrgency,
} from "../../model";

export interface filterVariantsI {
  icon: "🧩" | "🌎";
  title: string;
  link: string;
  $chooseFilter: Store<string>;
}

export const filtersVariants: filterVariantsI[] = [
  {
    icon: "🧩",
    title: "home.filter-category",
    link: "",
    $chooseFilter: $categories,
  },
  {
    icon: "🌎",
    title: "home.filter-lang-label",
    link: "",
    $chooseFilter: $language,
  },
];

export interface filterTogglesI {
  title: string;
  $stateFilter: Store<boolean>;
  toggleFilter: Event<void>;
}

export const filtersToggles: filterTogglesI[] = [
  {
    title: "home.filter-sort1",
    $stateFilter: $dateOfPublication,
    toggleFilter: clickedToggleDate,
  },
  {
    title: "home.filter-sort2",
    $stateFilter: $urgencyOfPublication,
    toggleFilter: clickedToggleUrgency,
  },
];
