import { useTranslation } from "react-i18next";
import { ColumnContent } from "../../";

import s from "./style.module.scss";
import download_icon from "../image/download.svg";
import { Button } from "@/shared/ui/button";

interface DownloadTechTaskProps {
  file_name: string;
  file_url: string;
}

export const DownloadTechTask = ({
  file_name,
  file_url,
}: DownloadTechTaskProps) => {
  const { t } = useTranslation();

  return (
    <ColumnContent title={t("task-detail.technical-task")}>
      {/* some_awesome_project.pdf */}
      <Button
        as="a"
        theme="large"
        className={s.download_button}
        href={file_url}
        download
      >
        {file_name}
        <img src={download_icon} alt="download" />
      </Button>
    </ColumnContent>
  );
};
