export type filterToggleValue = "createdAt" | "deadline";

export interface filterTogglesI {
  title: string;
  value: filterToggleValue;
}

export const filtersToggles: filterTogglesI[] = [
  {
    title: "home.filter-sort1",
    value: "createdAt",
  },
  {
    title: "home.filter-sort2",
    value: "deadline",
  },
];
