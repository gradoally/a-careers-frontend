import clsx from "clsx";
import s from "./style.module.scss";

interface HrProps {
  className?: string;
  theme?: "primary" | "linear-gradient";
}

export const Hr = ({ className, theme = "primary" }: HrProps) => (
  <div className={clsx(s.hr, className, s[theme])} />
);
