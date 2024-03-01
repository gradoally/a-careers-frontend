"use client"

import {styled} from '@mui/material/styles'
import {Paper, Button} from '@mui/material'

import {useEffect, useState} from "react";
import {TonConnectButton} from "@tonconnect/ui-react";

import {useTonClient} from '@/hooks/useTonClient';
import {useTonConnect} from "@/hooks/useTonConnect";

import {useMasterContract} from "@/hooks/useMasterContract";
import {useUserContract} from "@/hooks/useUserContract";
import {UserContentData, buildUserContent} from '@/contracts/User';
import {User as UserProfile} from '@/openapi/client/models/User';
import {OrderContentData, OrderData, buildOrderContent} from '@/contracts/Order';
import {Order} from '@/openapi/client/models/Order';
import {toNano} from '@ton/core';

const Card = styled(Paper)`
    padding: 18px 20px;
    border-radius: 8px;
    background-color: white;

    @media (prefers-color-scheme: dark) {
        background-color: #111;
    }
`;

const FlexBoxRow = styled(Paper)`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

const FlexBoxCol = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Ellipsis = styled(Paper)`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const StyledButton = styled(Button)`
    background-color: blue;
    border: 0;
    border-radius: 8px;
    padding: 10px 20px;
    //color: var(--tg-theme-button-text-color);
    font-weight: 700;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export default function Test() {
    const {walletAddress, sender} = useTonConnect();
    const {client} = useTonClient();

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


    const {
        address: userContractAddr,
        userData,
        sendChangeContent,
        sendCreateOrder
    } = useUserContract(String(userProfile?.address));
    const {userNextIndex, orderNextIndex, address: masterContractAddr, sendCreateUser} = useMasterContract();


    const findUser = async () => {
        const response = await fetch(
            `https://somebackend.just-dmitry.ru/api/finduser?address=${walletAddress}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        if (result.found) {
            setUserProfile(result.data);
        } else {
            setUserProfile(null);
        }
    }

    useEffect(() => {
        findUser();
    }, [walletAddress]);

    const createUserProfile = async () => {
        if (userNextIndex == null || client == null || userProfile)
            return;

        try {
            const userContentData: UserContentData = {
                isUser: true,
                isFreelancer: true,
                nickname: `user${userNextIndex}`,
                telegram: `@user${userNextIndex}`,
                about: `user${userNextIndex}-about`,
                website: `user${userNextIndex}-website`,
                portfolio: `user${userNextIndex}-portfolio`,
                resume: `user${userNextIndex}-resume`,
                specialization: `user${userNextIndex}-specialization`,
            };

            sendCreateUser("0.25", 0, buildUserContent(userContentData));
        } catch (e) {
            console.log("create_user_profile", e)
        }
    };

    const updateUserProfile = async () => {
        if (client == null || userProfile == null)
            return;

        try {
            const userContentData = {
                isUser: true,
                isFreelancer: true,
                nickname: `user${userNextIndex}-updated1`,
                telegram: `@user${userNextIndex}-updated1`,
                about: `user${userNextIndex}-about-updated1`,
                website: `user${userNextIndex}-website-updated1`,
                portfolio: `user${userNextIndex}-portfolio-updated1`,
                resume: `user${userNextIndex}-resume-updated`,
                specialization: `user${userNextIndex}-specialization-updated1`,
            };

            sendChangeContent("0.5", 0, buildUserContent(userContentData));
        } catch (e) {
            console.log("update_user_profile", e)
        }
    };

    const createOrder = async () => {
        if (orderNextIndex == null || client == null || userProfile == null)
            return;

        try {
            const orderContentData: OrderContentData = {
                category: "smart-contracts",
                language: "ru",
                name: "order-name-1",
                price: toNano(975),
                deadline: Math.round(Date.now() / 1000) + 604800,
                description: "order-description-1",
                technicalTask: "order-technicalTask-1",
            };

            const orderContentDataCell = buildOrderContent(orderContentData);
            // console.log("here", orderContentDataCell.toBoc().toString('hex'));

            sendCreateOrder("0.5", 0, orderContentDataCell, toNano(975), orderContentData.deadline, orderContentData.deadline + 259200);
        } catch (e) {
            console.log("create_order", e)
        }
    };

    return (
        <div style={{marginTop: "20px"}}>
            <TonConnectButton/>

            <Card>
                <FlexBoxCol>
                    <h3>Master</h3>
                    <FlexBoxRow>
                        <b>Master Contract Address</b>
                        <Ellipsis>{masterContractAddr}</Ellipsis>
                    </FlexBoxRow>
                    <FlexBoxRow>
                        <b>UserNextIndex</b>
                        <div>{userNextIndex ?? "Loading..."}</div>
                    </FlexBoxRow>
                </FlexBoxCol>
            </Card>
            <Card>
                <FlexBoxCol>
                    <h3>User</h3>
                    <FlexBoxRow>
                        UserProfile: {userProfile ? JSON.stringify(userProfile) : "_"}
                    </FlexBoxRow>
                    <FlexBoxRow>
                        UserData: {userData ? JSON.stringify(userData) : "_"}
                    </FlexBoxRow>
                    <FlexBoxRow>
                        {
                            userProfile == null ?
                                <StyledButton
                                    onClick={createUserProfile}
                                >
                                    Create User Profile
                                </StyledButton> :
                                <StyledButton
                                    onClick={updateUserProfile}
                                >
                                    Update User Profile
                                </StyledButton>
                        }
                        {
                            userProfile &&
                            <StyledButton
                                onClick={createOrder}
                            >
                                Create Order
                            </StyledButton>
                        }
                    </FlexBoxRow>
                </FlexBoxCol>
            </Card>
        </div>
    )
}