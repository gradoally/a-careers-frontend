import { ColumnContent } from "@/shared/ui/column-content";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";

import s from "./style.module.scss";

import delete_spec_icon from "../image/delete.svg";
import {
  $specializations,
  addedSpecialization,
  deleteSpecialization,
  modifedSpecialization,
} from "../../model";

export const Specializations = () => {
  const { t } = useTranslation();
  const specializations = useStore($specializations);

  return (
    <ColumnContent title={t("edit-profile.specialization")}>
      <div className={s.specs_container}>
        <button className={s.add_spec} onClick={addedSpecialization}>
          {/* icon plus */}+
        </button>

        {Object.entries(specializations).map(([key, value]) => (
          <div key={key} className={s.spec_block}>
            <input
              value={value}
              className={s.spec_input}
              onChange={(event) =>
                modifedSpecialization({ key, value: event.target.value })
              }
            />

            <button onClick={() => deleteSpecialization({ key })}>
              <img src={delete_spec_icon} alt="D" />
            </button>
          </div>
        ))}
      </div>
    </ColumnContent>
  );
};
