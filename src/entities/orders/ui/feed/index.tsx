import clsx from "clsx";
import s from "./style.module.scss";
import { PreviewOrders } from "./preview";
import { useStore } from "effector-react";

import { LoadingFeed } from "./preview-loading";
import { ordersLoadedRoute } from "../../model";

export const Feed = () => {
  const isFeedLoadedRouteOpened = useStore(ordersLoadedRoute.$isOpened);

  return (
    <div className={clsx("main", s.container)}>
      {!isFeedLoadedRouteOpened ? <LoadingFeed /> : <PreviewOrders />}
    </div>
  );
};
