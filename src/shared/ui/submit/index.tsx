import { Button } from "@/shared/ui/button";
import { Hr } from "@/shared/ui/hr";

import s from "./style.module.scss";

interface SubmitProps {
  submit_text: string;
}

export const Submit = ({ submit_text }: SubmitProps) => {
  return (
    <>
      <Hr className={s.hr} />
      <div className={s.content}>
        <Button theme="large" className={s.submit}>
          {submit_text}
          {/* {t("home.submit-filter", { count: 77 })} */}
        </Button>
      </div>
    </>
  );
};
