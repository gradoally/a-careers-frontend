import { Hr } from "@/shared/ui/hr";
import { Link } from "atomic-router-react";
import { routes } from "@/shared/router";
import { Status } from "@/shared/ui/status";
import { getClassStatus } from "@/shared/lib/get-class-status";

import s from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { FeedOrder } from "../../../config";
import { Skeleton } from "@/shared/ui/skeleton";
import clsx from "clsx";
import { getTextCountResponses } from "../../../lib";

export const PreviewOrder = ({
  id,
  title,
  price,
  data,
  count_response,
}: FeedOrder) => {
  const { t } = useTranslation();

  return (
    <Link
      to={routes.order}
      params={{ orderId: id.toString() }}
      key={id}
      className={s.wrapper_order}
    >
      <h3 className={s.title}>{title}</h3>
      <p className={clsx(s.deadline, s.padding_text)}>{data}</p>
      <p className={clsx(s.price, s.padding_text)}>💎 {price}</p>

      <Status theme={getClassStatus(count_response)}>
        {getTextCountResponses(count_response, t)}
      </Status>

      <Hr className={s.hr} theme="linear-gradient" />
    </Link>
  );
};

export const LoadingPreviewOrder = () =>
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
