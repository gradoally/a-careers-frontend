import clsx from "clsx";

import s from "./style.module.scss";

export const PageLazyLoading = () => {
  return (
    <div className={clsx("app", s.container_loading)}>
      <img className={s.loading_image} src="/icon.svg" alt="" />
    </div>
  );
};
