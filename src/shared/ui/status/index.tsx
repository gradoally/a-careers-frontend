import clsx from "clsx";

import s from "./style.module.scss";
import { ComponentProps, themeStatus } from "@/shared/config/types";

interface StatusProps extends ComponentProps {
  theme: themeStatus;
}

export const Status = ({ children, theme, className }: StatusProps) => (
  <div className={clsx(s.order_count_responses, className, s[theme])}>
    {children}
  </div>
);
