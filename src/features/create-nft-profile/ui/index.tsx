import { AvatarUser } from "@/entities/user";
import { Submit } from "@/shared/ui/submit";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import s from "./style.module.scss";
import { Field } from "@/shared/ui/column-content";
import {
  $telegram_id,
  $telegram_nickname,
  $about_yorself,
  changedAbout_yorself,
  $link_site,
  changedLink_site,
  $link_portfolio,
  changedLink_portfolio,
} from "../model";
import { Specializations } from "./specializations";
import { ResumeUpload } from "./resume";

export const CreateNftProfile = () => {
  const { t } = useTranslation();

  return (
    <>
      <main className={clsx("main", s.container)}>
        <AvatarUser size="settings" />

        <Field title="Telegram" $store={$telegram_id} isDisabled />

        <Field
          title={t("edit-profile.nickname")}
          $store={$telegram_nickname}
          isDisabled
        />

        <Field
          title={t("edit-profile.about")}
          $store={$about_yorself}
          inputed={changedAbout_yorself}
        />

        <div className={s.profile_freelance}>
          <h2 className={s.profile_freelance_title}>
            {t("common.profile-create-title")}
          </h2>
          <p className={s.profile_freelance_description}>
            {t("common.profile-create-description")}
          </p>
        </div>

        <Field
          title={t("edit-profile.site")}
          $store={$link_site}
          inputed={changedLink_site}
        />

        <Field
          title={t("edit-profile.portfolio")}
          $store={$link_portfolio}
          inputed={changedLink_portfolio}
        />

        <ResumeUpload />

        <Specializations />
      </main>

      <Submit
        submit_text={t("common.create-profile")}
        network_commission="0.011"
      />
    </>
  );
};
