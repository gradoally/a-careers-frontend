import { clsx } from "clsx";
import { ElementType } from "react";

import cls, { button, base_size } from "./style.module.scss";
import { ButtonProps } from "./index.type";
import { Skeleton } from "@/shared/ui/skeleton";

const defaultElement = "button";

export const Button = <AS extends ElementType = typeof defaultElement>({
  className = "",
  children,
  theme = "primary",
  isActive = false,
  isDisabled = false,
  as,
  isLoading,
  skeletonClass,
  ...otherProps
}: ButtonProps<AS>) => {
  const TagName = as || defaultElement;

  if (isLoading) {
    return (
      <Skeleton
        isLoading={isLoading}
        skeletonClass={clsx(base_size, skeletonClass)}
      />
    );
  }

  return (
    <TagName
      className={clsx(button, [className, cls[theme]])}
      {...otherProps}
      aria-checked={isActive}
      disabled={isDisabled}
    >
      {children}
    </TagName>
  );
};
