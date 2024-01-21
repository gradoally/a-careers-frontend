import { ComponentProps, ElementType } from "react";
import { SharedSkeleton } from "@/shared/ui/skeleton";

export type ThemeButton = "primary";

export interface ButtonOwnProps<AS extends ElementType = ElementType>
  extends SharedSkeleton {
  className?: string;
  theme?: ThemeButton;
  as?: AS;
}

export type ButtonProps<AS extends ElementType> = ButtonOwnProps<AS> &
  Omit<ComponentProps<AS>, keyof ButtonOwnProps>;
