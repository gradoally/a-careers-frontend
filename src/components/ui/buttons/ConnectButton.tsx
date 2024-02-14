"use client"

import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { CHAIN } from "@tonconnect/protocol";
import { Address, OpenedContract } from '@ton/core';
import { useTonConnect } from "@/hooks/useTonConnect";
import { useTonClient } from '@/hooks/useTonClient';
import { useCounterContract } from '@/hooks/useCounterContract';
import { useMasterContract } from '@/hooks/useMasterContract';
import { Counter } from '@/contracts/Counter';
import { Master } from '@/contracts/Master';
import { User, UserConfig, UserContentData } from '@/contracts/User';

const ConnectButton = ({text}: {text: string})=>{
    const [tonConnectUI] = useTonConnectUI();
    const { connected, network, wallet, sender } = useTonConnect();
		const client = useTonClient();
		// const { userNextIndex } = useMasterContract();
		const { value, address } = useCounterContract();

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
        } catch (e){
            console.log(e)
        }
    };

    const onCreateUser = async () => {
			// console.log("counter", value, address);

        try {
					if (!client) return;
					// console.log("userNextIndex", userNextIndex);

    			// const user1 = client.open(User.createFromAddress(Address.parse("EQADhEECaDCkQWcg87uZWMO6f9QrigHTOPtxW1DEQPuHwNxO")));
					// console.log("user data", await user1.getUserData());
					
					// const masterContract = client.open(new Master(Address.parse("EQCmgRIfj3trNv5aR9fvDYaVkQ5yskhq6RJ4ygQ4BdiUQBtx")));
					// console.log("indexes", await masterContract.getIndexes());
					
					// const counterContract = client.open(new Counter(Address.parse("EQBPEDbGdwaLv1DKntg9r6SjFIVplSaSJoJ-TVLe_2rqBOmH")));
					// if (!counterContract) return;
					// console.log("counter", await counterContract.getCounter());

        } catch (e){
            console.log("onCreateUser", e)
        }
    };

    return (
        connected
        ?
					// <Button
					// 	onClick={onCreateUser}
					// 	sx={{
					// 		height: "30px",
					// 		borderRadius: "25px",
					// 		padding: "5px 12px 6px 14px",
					// 		// backgroundColor: "secondary.main",
					// 		color: "common.black",
					// 		fontWeight: "600",
					// 		fontSize: "16px",
					// 		"width": "146px",
					// 	}}
					// >
					// 	{ value }
					// </Button>
					// <div>{value ?? "Loading..."}</div>
					// <Button color="secondary" variant="contained" onClick={onCreateUser}> {value ?? "Loading..."} </Button>
					wallet
        : <Button
            onClick={onConnectWallet}
						sx={{
							height: "30px",
							borderRadius: "25px",
							padding: "5px 12px 6px 14px",
							// backgroundColor: "secondary.main",
							color: "common.black",
							fontWeight: "600",
							fontSize: "16px",
							"width": "146px",
						}}
						color="secondary" variant="contained"
					>
            {text}
        </Button>
    )
}

export default ConnectButton;