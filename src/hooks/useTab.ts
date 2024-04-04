import { useState } from "react";

export interface ITabHook {
  tab: number;
  changeTab: (newTab: number) => void;
}

export default function useTab(defaultTab: number = 0): ITabHook {
  const [tab, setTab] = useState(defaultTab);
  const changeTab = (newTab: number) => setTab(newTab);

  return {
    tab,
    changeTab,
  };
}
