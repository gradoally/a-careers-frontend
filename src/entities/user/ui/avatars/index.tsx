import { Link } from "atomic-router-react";
import mock_avatar from "./image/mock_avatar.png";
import s from "./style.module.scss";
import { routes } from "@/shared/router";

type avatarSizes = "header" | "order" | "menu" | "settings" | "profile";

interface AvatarUserProps {
  size: avatarSizes;
}

export const AvatarUser = ({ size }: AvatarUserProps) => {
  return (
    <Link to={routes.menu} className={s[size]}>
      <img src={mock_avatar} className={s.avatar_image} alt="avatar" />
    </Link>
  );
};
