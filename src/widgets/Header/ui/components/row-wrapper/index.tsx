import clsx from "clsx";
import { ComponentProps } from "@/shared/config/types";

import s from "./style.module.scss";

interface RowWrapperProps extends ComponentProps {
  gap: string;
}

export const RowWrapper = ({ children, gap }: RowWrapperProps) => (
  <div className={clsx(s.rowWrapper, s[`gap_${gap}`])}>{children}</div>
);
