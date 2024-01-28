import { $isCreateProfileUser } from "@/entities/user/model";
import { routes } from "@/shared/router";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useStore } from "effector-react";
import { ReactNode, useEffect } from "react";

export const IsCreateProfile = ({ children }: { children: ReactNode }) => {
  const isCreateProfileUser = useStore($isCreateProfileUser);
  const [{ account }] = useTonConnectUI();

  useEffect(() => {
    // if(!isCreateProfileUser && account?.address) {
    //   routes.create_nft_profile.open();
    // }
  }, [isCreateProfileUser, account]);

  return children;
};
