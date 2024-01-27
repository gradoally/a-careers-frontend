import { Hr } from "@/shared/ui/hr";
import { Link } from "atomic-router-react";
import { routes } from "@/shared/router";
import { Status } from "@/shared/ui/status";
import { getClassStatus } from "@/shared/lib/get-class-status";

import s from "../preview.module.scss";
import clsx from "clsx";
import { getTextCountResponses } from "../../../lib";
import { $feedOrders, $isRanOrders, reachedEndOfPage } from "../../../model";
import { InView } from "react-intersection-observer";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";
import { FeedOrder } from "@/shared/api";

export const PreviewOrders = () => {
  const { t } = useTranslation();
  const feedOrders = useStore($feedOrders);
  const isRanOrders = useStore($isRanOrders);

  return (
    <>
      {feedOrders.map((order) => (
        <PreviewOrder {...order} />
      ))}

      <InView as="div" onChange={(inView) => inView && reachedEndOfPage()} />

      <div className={s.body_spinner_loading}>
        {!isRanOrders ? (
          <LoadingSpinner />
        ) : (
          <h1>{t("home.orders-are-out")}</h1>
        )}
      </div>
    </>
  );
};

const PreviewOrder = ({
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