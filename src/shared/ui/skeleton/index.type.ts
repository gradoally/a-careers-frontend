import { ReactNode } from "react";

export interface SkeletonProps {
  children?: ReactNode;
  isLoading?: boolean;
  skeletonClass?: string;
}

export type SharedSkeleton = Omit<SkeletonProps, "children">;
