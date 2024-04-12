"use client"
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslations } from "next-intl";

import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { CHAIN } from "@tonconnect/protocol";

import { useTonConnect } from "@/hooks/useTonConnect";
import { toast } from "@/lib/helper";
import { useAuthContext } from '@/lib/provider/auth.provider';

import { CircularLoading } from '@/components/features/Loaders';

import UnicornGif from "@/assets/gif/unicorn-low.gif";

const ConnectButton = ({ text }: { text: string }) => {
    const trans = useTranslations();
    const { updateUser } = useAuthContext();
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
        !connectionChecked ? <Image src={UnicornGif} alt='unicorn' width={30} height={30} /> : (connected ?
            <Avatar onClick={async () => {
                await tonConnectUI.disconnect()
                toast(trans("common.disconnected_from_ton_wallet"), 'success');
                updateUser({ found: false, data: null });
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
                    fontFamily: "SFProSemiBold",
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
