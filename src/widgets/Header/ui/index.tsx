import clsx from "clsx";
import s from "./style.module.scss";
import { OpenMenu } from "./components";
import { SearchTasks } from "@/features/search-tasks";
import { ConnectWallet } from "@/features/connect-wallet";

export const Header = () => {
  return (
    <header className={clsx(s.header)}>
      <OpenMenu />
      <SearchTasks />
      <ConnectWallet />
    </header>
  );
};
