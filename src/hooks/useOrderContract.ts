import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { Address, Cell, OpenedContract, toNano } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Order, OrderData } from "../contracts/Order";
import { number } from "zod";

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
    sendAssignUser: (value: bigint, queryId: number, price: bigint, deadline: number, freelancerAddress: Address) => {
      return orderContract?.sendAssignUser(sender, value, queryId, price, deadline, freelancerAddress);
    },
    sendCancelAssign: (value: bigint, queryID: number) => {
      return orderContract?.sendCancelAssign(sender, value, queryID);
    },
    sendAcceptOrder: (value: bigint, queryID: number) => {
      return orderContract?.sendAcceptOrder(sender, value, queryID);
    },
    sendRejectOrder: (value: bigint, queryID: number) => {
      return orderContract?.sendRejectOrder(sender, value, queryID);
    },
    sendCompleteOrder: (value: bigint, queryID: number, result: string) => {
      return orderContract?.sendCompleteOrder(sender, value, queryID, result);
    },
    sendCustomerFeedback: (value: bigint, queryID: number, arbitration: boolean) => {
      return orderContract?.sendCustomerFeedback(sender, value, queryID, arbitration);
    },
  };
}
