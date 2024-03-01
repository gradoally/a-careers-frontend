import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { Address, Cell, OpenedContract, toNano } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Master } from "../contracts/Master";

export function useMasterContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();
  const [userNextIndex, setUserNextIndex] = useState<null | number>();
  const [orderNextIndex, setOrderNextIndex] = useState<null | number>();

  const masterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Master(Address.parse("EQCmgRIfj3trNv5aR9fvDYaVkQ5yskhq6RJ4ygQ4BdiUQBtx"));
    return client.open(contract) as OpenedContract<Master>;
  }, [client]);

  const getIndexes = async () => {
    if (!masterContract) return;
    
    const indexes = await masterContract.getIndexes();
    setUserNextIndex(indexes.userNextIndex);
    setOrderNextIndex(indexes.orderNextIndex);
  }
  
  useEffect(() => {
    getIndexes();
  }, [masterContract]);

  return {
    address: masterContract?.address.toString(),
    userNextIndex: userNextIndex,
    orderNextIndex: orderNextIndex,
    sendCreateUser: (value: bigint | string, queryId: number, content: Cell) => {
      return masterContract?.sendCreateUser(sender, toNano(value), queryId, content);
    },
  };
}
