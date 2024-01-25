import { ReactNode } from "react";

export type heightText = "xl" | "l" | "m" | "s" | "xs" | "status";

export interface SkeletonProps {
  children?: ReactNode;
  isLoading?: boolean;
  skeletonClass?: string;
  heightText?: heightText;
}

export type SharedSkeleton = Omit<SkeletonProps, "children">;
