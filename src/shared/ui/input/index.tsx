import clsx from "clsx";

import { InputProps } from "./index.type";

import s from "./style.module.scss";

export const Input = ({
  theme = "primary",
  isDisabled,
  className = "",
  type = "text",
  ...otherProps
}: InputProps) => {
  console.log(s["primary"]);
  return (
    <input
      className={clsx(s.input, { [s.disabled]: isDisabled }, [
        s[theme],
        className,
      ])}
      type={type}
      {...otherProps}
    />
  );
};
