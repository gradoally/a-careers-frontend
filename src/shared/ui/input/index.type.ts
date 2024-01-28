import { InputHTMLAttributes } from "react";

export type ThemeInput = "primary" | "search-orders";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  theme?: ThemeInput;
}
