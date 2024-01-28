import clsx from "clsx";

import s from "./style.module.scss";
import { ComponentProps } from "@/shared/config/types";

interface ColumnContentProps extends ComponentProps {
  title: string;
}

export const ColumnContent = ({
  className,
  title,
  children,
}: ColumnContentProps) => (
  <div className={clsx(s.container, className)}>
    <h4 className={s.title}>{title}</h4>
    {children}
  </div>
);

export { Address, DownloadTechTask, Field } from "./components";
