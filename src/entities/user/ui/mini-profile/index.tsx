import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import clsx from "clsx";

import mock_avatar from "../image/mock_avatar.png";
import { Link } from "atomic-router-react";
import { routes } from "@/shared/router";

interface MiniProfileProps {
  className?: string;
}

export const MiniProfile = ({ className }: MiniProfileProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(s.container, className)}>
      <h3 className={s.conatiner_title}>{t("task-detail.customer")}</h3>

      <div className={s.profile_body}>
        <div className={s.avatar_body}>
          <img src={mock_avatar} className={s.avatar_image} alt="avatar" />
        </div>

        <div className={s.main_section}>
          <p className={s.name_customer}>@another_kote</p>

          <div className={s.statistic}>
            <p className={s.content_text}>✅ 2</p>
            <p className={s.hidden_text}>❎ 1</p>
          </div>

          <div className={s.contacts}>
            {/* mock */}
            <Link to={routes.main} className={s.hidden_text}>
              Профиль 📖
            </Link>
            <Link to={""} className={s.hidden_text}>
              Telegram ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
