import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { Address, Cell, OpenedContract, toNano } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { User, UserData, buildUserContent } from "../contracts/User";
import { number } from "zod";

export function useUserContract(address: string) {
  const { client } = useTonClient();
  const { sender } = useTonConnect();

  const [userData, setUserData] = useState<UserData | null>(null);

  const userContract = useAsyncInitialize(async () => {
    if (!client || !address) return;
    const contract = User.createFromAddress(Address.parse(address || ""));
    return client.open(contract) as OpenedContract<User>;
  }, [client, address]);

  const getUserData = async () => {
    if (!userContract) return;
    
    const result = await userContract.getUserData();
    setUserData(result);
  }
  
  useEffect(() => {
    getUserData();
  }, [userContract]);

  return {
    address: userContract?.address.toString(),
    userData: userData,
    sendChangeContent: (value: bigint | string, queryId: number, content: Cell) => {
      return userContract?.sendChangeContent(sender, toNano(value), queryId, content);
    },
    sendCreateOrder: (value: bigint | string, queryID: number, content: Cell, price: bigint, deadline: number, timeForCheck: number) => {
      return userContract?.sendCreateOrder(sender, toNano(value), queryID, content, price, deadline, timeForCheck);
    },
    sendAddResponse: (value: bigint | string, queryID: number, orderIndex: number, content: Cell) => {
      return userContract?.sendAddResponse(sender, toNano(value), queryID, orderIndex, content);
    },
  };
}
