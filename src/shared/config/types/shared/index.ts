import { ReactNode } from "react";

export type Page = JSX.Element;

export interface ComponentProps {
  children: ReactNode;
  className?: string;
}
