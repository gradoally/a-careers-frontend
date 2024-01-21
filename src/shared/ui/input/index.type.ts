import { InputHTMLAttributes } from "react";

export type ThemeInput = "primary" | "search-tasks";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  theme?: ThemeInput;
  isDisabled?: boolean;
}
