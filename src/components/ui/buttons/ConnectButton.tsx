"use client"

import { useEffect } from 'react';
import { useTranslations } from "next-intl";

import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { CHAIN } from "@tonconnect/protocol";

import { useTonConnect } from "@/hooks/useTonConnect";
import { toast } from "@/lib/helper";
import { CircularLoading } from '@/components/features/Loaders';

const ConnectButton = ({ text }: { text: string }) => {
    const trans = useTranslations();
    const [tonConnectUI] = useTonConnectUI();
    const { connected, network, connectionChecked } = useTonConnect();
   
    useEffect(() => {
        if (!network) return;
        if (network === CHAIN.TESTNET) {
            alert("Connect to mainnet");
            tonConnectUI.disconnect();
            return;
        }
    }, [network])

    const onConnectWallet = async () => {
        try {
            await tonConnectUI.openModal();
        } catch (e) {
            toast(trans("errors.something_went_wrong_when_try_to_connect_ton_wallet"), 'warning');
        }
    };

    return (
        !connectionChecked ? <CircularLoading className='!w-[30px] !h-[30px] my-auto' color='info' /> : (connected ?
            <Avatar onClick={async () => {
                await tonConnectUI.disconnect()
                toast(trans("common.disconnected_from_ton_wallet"), 'success')
            }}
                className="!w-[30px] !h-[30px] border border-white"
                alt="Diamond"
                src={"/images/diamond.png"}
            />
            : <Button onClick={onConnectWallet}
                className="max-w-[146px] h-[30px]"
                sx={{
                    borderRadius: "25px",
                    padding: "5px 12px 6px 14px",
                    color: "common.black",
                    fontFamily: "InterSemiBold",
                    fontWeight: "600",
                    fontSize: "16px",
                    lineHeight: "normal"
                }}
                color="secondary" variant="contained"
            >
                {text}
            </Button>
        )
    )
}

export default ConnectButton;
