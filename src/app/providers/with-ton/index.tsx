import { TON_MANIFEST, TWA_URL } from "@/shared/config/ton";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ReactNode } from "react";

export const withTon = (component: () => ReactNode) => () => (
  <TonConnectUIProvider
    manifestUrl={TON_MANIFEST}
    actionsConfiguration={{
      twaReturnUrl: TWA_URL,
    }}
  >
    {component()}
  </TonConnectUIProvider>
);
