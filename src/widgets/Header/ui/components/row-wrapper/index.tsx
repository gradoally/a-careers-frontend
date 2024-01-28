import clsx from "clsx";
import { ComponentProps } from "@/shared/config/types";

import s from "./style.module.scss";

interface HeaderRowWrapperProps extends ComponentProps {
  gap: string;
}

export const HeaderRowWrapper = ({ children, gap }: HeaderRowWrapperProps) => (
  <div className={clsx(s.HeaderRowWrapper, s[`gap_${gap}`])}>{children}</div>
);
