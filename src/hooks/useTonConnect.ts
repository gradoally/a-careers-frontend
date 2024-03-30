import {
  CHAIN,
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { Sender, SenderArguments } from "@ton/core";

export function useTonConnect(): {
  sender: Sender;
  connect: (cb?: () => void) => Promise<void>;
  connected: boolean | undefined;
  connectionChecked: boolean;
  walletAddress: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const connectionRestored = useIsConnectionRestored();

  const wallet = useTonWallet();

  async function connect(cb?: () => void) {
    try {
      await tonConnectUI.openModal();
      cb && cb();
    } catch (err) {
      console.log(err);
    }
  }

  return {
    sender: {
      send: async (args: SenderArguments) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connect,
    connected: tonConnectUI?.connected,
    connectionChecked: connectionRestored,
    walletAddress: wallet
      ? toUserFriendlyAddress(wallet.account.address)
      : null,
    network: wallet?.account.chain ?? null,
  };
}
