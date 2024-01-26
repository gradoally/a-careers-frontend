import clsx from "clsx";

import s from "./style.module.scss";
import { ComponentProps } from "@/shared/config/types";
import { themeStatus } from "@/shared/config/status-order";

interface StatusProps extends ComponentProps {
  theme: themeStatus;
}

export const Status = ({ children, theme, className }: StatusProps) => (
  <div className={clsx(s.order_count_responses, className, s[theme])}>
    {children}
  </div>
);
