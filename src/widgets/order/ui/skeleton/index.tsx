import clsx from "clsx";

import s from "./style.module.scss";
import { container, hr } from "../style.module.scss";
import { Skeleton } from "@/shared/ui/skeleton";
import { Hr } from "@/shared/ui/hr";
import { skeletonArray } from "@/shared/lib/skeleton-array";
import { Fragment } from "react";

export const OrderLoadingWidget = () => {
  return (
    <div className={clsx("main", container)}>
      <Skeleton heightText="status" isLoading />

      <Skeleton skeletonClass={s.title} isLoading />

      <Skeleton skeletonClass={s.price} heightText="xs" isLoading />
      <SkeletonColumn count={7} />

      <Hr theme="linear-gradient" className={hr} />

      <SkeletonColumn count={2} />

      <Skeleton skeletonClass={s.profile} isLoading />
    </div>
  );
};

const SkeletonColumn = ({ count }: { count: number }) =>
  skeletonArray(count).map((key) => (
    <Fragment key={key}>
      <Skeleton skeletonClass={s.column} heightText="xs" isLoading />

      <Skeleton skeletonClass={s.column_content} heightText="xs" isLoading />
    </Fragment>
  ));
