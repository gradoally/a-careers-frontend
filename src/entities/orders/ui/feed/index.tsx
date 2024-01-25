import clsx from "clsx";
import s from "./style.module.scss";
import { LoadingPreviewOrder, PreviewOrder } from "./preview";
import { useStore } from "effector-react";
import {
  $feedOrders,
  $isRanOrders,
  ordersLoadedRoute,
  reachedEndOfPage,
} from "../../model";
import { InView } from "react-intersection-observer";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { useTranslation } from "react-i18next";

export const Feed = () => {
  const { t } = useTranslation();
  const isFeedLoadedRouteOpened = useStore(ordersLoadedRoute.$isOpened);
  const feedOrders = useStore($feedOrders);
  const isRanOrders = useStore($isRanOrders);

  return (
    <div
      className={clsx("main", s.container, {
        [s.loading]: !isFeedLoadedRouteOpened,
      })}
    >
      {!isFeedLoadedRouteOpened ? (
        <LoadingPreviewOrder />
      ) : (
        <>
          {feedOrders.map((order) => (
            <PreviewOrder {...order} />
          ))}

          <InView
            as="div"
            onChange={(inView) => inView && reachedEndOfPage()}
          />

          <div className={s.body_spinner_loading}>
            {isRanOrders ? (
              <LoadingSpinner />
            ) : (
              <h1>{t("home.orders-are-out")}</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};
