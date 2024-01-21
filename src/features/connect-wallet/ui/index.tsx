import { Button } from "@/shared/ui/button";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTranslation } from "react-i18next";

export const ConnectWallet = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();

  const onConnectWallet = () => {
    tonConnectUI.connectWallet();
  };

  return (
    <Button onClick={onConnectWallet}>{t("buttons.connectWallet")}</Button>
  );
};
