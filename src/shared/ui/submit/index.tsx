import { ButtonHTMLAttributes } from "react";

import { Button } from "@/shared/ui/button";
import { Hr } from "@/shared/ui/hr";

import s from "./style.module.scss";
import { useTranslation } from "react-i18next";

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  submit_text: string;
  network_commission?: string;
}

export const Submit = ({
  submit_text,
  network_commission,
  ...button_props
}: SubmitProps) => {
  const { t } = useTranslation();

  return (
    <div className={s.container}>
      <Hr className={s.hr} />
      <div className={s.content}>
        <Button theme="primary_large" className={s.submit} {...button_props}>
          {submit_text}
          {/* {t("home.submit-filter", { count: 77 })} */}
        </Button>

        {network_commission && (
          <p className={s.network_commission}>
            {t("common.network-commission", { ton: network_commission })}
          </p>
        )}
      </div>
    </div>
  );
};
