import clsx from "clsx";
import { InputHTMLAttributes } from "react";

import s from "./style.module.scss";

export const Checkbox = ({
  className,
  checked,
  ...otherProps
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={clsx(s.toggle, { [s.toggle_active]: checked }, className)}>
      <input type="checkbox" {...otherProps} />
    </div>
  );
};
