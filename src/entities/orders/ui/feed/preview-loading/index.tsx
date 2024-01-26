import { Hr } from "@/shared/ui/hr";
import { Skeleton } from "@/shared/ui/skeleton";
import s from "../preview.module.scss";

export const LoadingFeed = () =>
  [].map
    .call("_".repeat(10), (_, key) => key)
    .map((key) => (
      <div key={key as number} className={s.wrapper_order}>
        <Skeleton heightText="s" isLoading />

        <Skeleton heightText="xs" skeletonClass={s.padding_text} isLoading />
        <Skeleton heightText="xs" skeletonClass={s.padding_text} isLoading />

        <Skeleton
          heightText="status"
          skeletonClass={s.padding_text}
          isLoading
        />

        <Hr className={s.hr} theme="linear-gradient" />
      </div>
    ));
