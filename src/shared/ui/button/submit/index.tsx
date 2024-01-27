import { ButtonHTMLAttributes } from "react";

import { Button } from "@/shared/ui/button";
import { Hr } from "@/shared/ui/hr";

import s from "./style.module.scss";
import clsx from "clsx";

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  submit_text: string;
}

export const Submit = ({ submit_text, ...button_props }: SubmitProps) => {
  return (
    <>
      <Hr className={s.hr} />
      <div className={s.content}>
        <Button
          theme="primary_large"
          className={clsx(s.submit, "main")}
          {...button_props}
        >
          {submit_text}
          {/* {t("home.submit-filter", { count: 77 })} */}
        </Button>
      </div>
    </>
  );
};
