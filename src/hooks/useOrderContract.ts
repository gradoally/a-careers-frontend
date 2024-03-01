import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { Address, Cell, OpenedContract, toNano } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Order, OrderData } from "../contracts/Order";

export function useOrderContract(address: string) {
  const { client } = useTonClient();
  const { sender } = useTonConnect();

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const orderContract = useAsyncInitialize(async () => {
    if (!client || !address) return;
    const contract = Order.createFromAddress(Address.parse(address || ""));
    return client.open(contract) as OpenedContract<Order>;
  }, [client, address]);

  const getOrderData = async () => {
    if (!orderContract) return;
    
    const result = await orderContract.getOrderData();
    setOrderData(result);
  }
  
  useEffect(() => {
    getOrderData();
  }, [orderContract]);

  return {
    address: orderContract?.address.toString(),
    orderData: orderData,
    // sendChangeContent: (value: bigint | string, queryId: number, content: Cell) => {
    //   return orderContract?.sendChangeContent(sender, toNano(value), queryId, content);
    // },
  };
}
