import { Hr } from "@/shared/ui/hr";
import { Skeleton } from "@/shared/ui/skeleton";
import s from "../preview.module.scss";
import { skeletonArray } from "@/shared/lib/skeleton-array";

export const LoadingFeed = () =>
  skeletonArray(10).map((key) => (
    <div key={key as number} className={s.wrapper_order}>
      <Skeleton heightText="s" isLoading />

      <Skeleton heightText="xs" skeletonClass={s.padding_text} isLoading />
      <Skeleton heightText="xs" skeletonClass={s.padding_text} isLoading />

      <Skeleton heightText="status" skeletonClass={s.padding_text} isLoading />

      <Hr className={s.border_bottom} theme="linear-gradient" />
    </div>
  ));
