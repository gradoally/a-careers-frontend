import { Button } from "@/shared/ui/button";
import { ColumnContent } from "@/shared/ui/column-content";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import s from "./style.module.scss";
import modificed_icon from "@/shared/assets/pen.svg";
import { $resume, changedResume } from "../../model";

export const ResumeUpload = () => {
  const { t } = useTranslation();
  const file = useStore($resume);

  return (
    <ColumnContent title={t("edit-profile.resume")}>
      <Button theme="large" className={s.resume_upload}>
        {file ? (
          <>
            {file.name}
            <img src={modificed_icon} alt="" />
          </>
        ) : (
          <p className={s.text_upload}>{t("common.upload-resume")}</p>
        )}
        <input
          type="file"
          accept=".doc,.docx,.pdf,.md"
          onChange={(event) => changedResume(event.target.files?.[0] ?? null)}
        />
      </Button>
    </ColumnContent>
  );
};
