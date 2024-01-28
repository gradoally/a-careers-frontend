import s from "./style.module.scss";
import { onCopyText } from "@/shared/lib/onCopy-text";
import { shortenedAddress } from "@/shared/lib/shortened-address";
import icon_copy from "../image/copy.svg";
import { ColumnContent } from "../../";
import { useTranslation } from "react-i18next";

interface AddressProps {
  className?: string;
  address: string;
}

export const Address = ({ className, address }: AddressProps) => {
  const { t } = useTranslation();
  return (
    <ColumnContent title={t("task-detail.address")} className={className}>
      <button onClick={onCopyText(address)} className={s.address_container}>
        <span className={s.address}>{shortenedAddress(address)}</span>
        <img src={icon_copy} alt="copy" />
      </button>
    </ColumnContent>
  );
};
