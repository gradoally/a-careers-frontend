import clsx from "clsx";
import { memo } from "react";

import { SkeletonProps, SharedSkeleton } from "./index.type";
import cls from "./style.module.scss";

const SkeletonWrapper = ({
  children,
  isLoading,
  skeletonClass,
}: SkeletonProps) => {
  if (isLoading) {
    return (
      <div className={clsx(cls.skeleton_wrapper, skeletonClass)}>
        <div className={cls.skeleton_loading} />
      </div>
    );
  }

  return <>{children}</>;
};

export const Skeleton = memo(SkeletonWrapper);
export type { SharedSkeleton };
