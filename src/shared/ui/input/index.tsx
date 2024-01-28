import clsx from "clsx";

import { InputProps } from "./index.type";

import s from "./style.module.scss";

export const Input = ({
  theme = "primary",
  disabled,
  className = "",
  type = "text",
  ...otherProps
}: InputProps) => {
  return (
    <input
      className={clsx(
        s.input,
        {
          [s.disabled]: disabled,
        },
        [s[theme], className],
      )}
      disabled={disabled}
      type={type}
      {...otherProps}
    />
  );
};
