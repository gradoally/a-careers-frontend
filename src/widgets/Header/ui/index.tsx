import clsx from "clsx";
import s from "./style.module.scss";
import { ComponentProps } from "@/shared/config/types";

export const Header = ({ children, className }: ComponentProps) => {
  return <header className={clsx(s.header, className)}>{children}</header>;
};

export { OpenMenu, HeaderBack } from "./components";
