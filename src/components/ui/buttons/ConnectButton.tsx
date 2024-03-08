"use client"

import { useEffect } from 'react';
import { useTranslations } from "next-intl";
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { CHAIN } from "@tonconnect/protocol";
import { useTonConnect } from "@/hooks/useTonConnect";
import { toast } from "@/lib/helper";

const ConnectButton = ({ text }: { text: string }) => {
    const trans = useTranslations()
    const [tonConnectUI] = useTonConnectUI();
    const { connected, network, sender } = useTonConnect();

    useEffect(() => {
        if (network === CHAIN.TESTNET) {
            alert("Connect to mainnet");
            tonConnectUI.disconnect();
            return;
        }

        // console.log("counter", value, address);
    }, [network])

    const onConnectWallet = async () => {
        try {
            await tonConnectUI.openModal();
            // toast(t("common.connected_to_ton_wallet"), 'success')
        } catch (e) {
            toast(trans("errors.something_went_wrong_when_try_to_connect_ton_wallet"), 'warning')
            console.log(e)
        }
    };

    return (
        connected ?
            (
                <Avatar onClick={async () => {
                    await tonConnectUI.disconnect()
                    toast(trans("common.disconnected_from_ton_wallet"), 'success')
                }}
                    className="w-[30px] h-[30px] border border-white"
                    // sx={{bgcolor:  "common.white"}}
                    alt="Diamond"
                    src={"/images/diamond.png"}
                />
            ) :
            (
                <Button onClick={onConnectWallet}
                    className="max-w-[146px] h-[30px]"
                    sx={{
                        borderRadius: "25px",
                        padding: "5px 12px 6px 14px",
                        // backgroundColor: "secondary.main",
                        color: "common.black",
                        fontWeight: "600",
                        fontSize: "16px",
                    }}
                    color="secondary" variant="contained"
                >
                    {text}
                </Button>
            )
    )
}

export default ConnectButton;
