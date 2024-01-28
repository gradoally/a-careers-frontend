import { AvatarUser } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";

export const ConnectWallet = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();

  const onConnectWallet = () => {
    tonConnectUI.connectWallet();
  };

  if (tonConnectUI.account?.address) {
    return <AvatarUser size="header" />;
  }

  return (
    <Button onClick={onConnectWallet}>{t("buttons.connectWallet")}</Button>
  );
};
