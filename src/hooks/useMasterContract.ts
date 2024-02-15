import { useEffect, useState } from 'react';
import { Master, Indexes } from '../contracts/Master';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';

export function useMasterContract() {
  const client = useTonClient();
  const [userNextIndex, setUserNextIndex] = useState<null | number>();
  const { sender } = useTonConnect();

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
  
  const masterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Master(Address.parse(process.env.MASTER_CONTRACT_ADDRESS || ""));
    return client.open(contract) as OpenedContract<Master>;
  }, [client]);

  useEffect(() => {
    async function getIndexes() {
      if (!masterContract) return;
      setUserNextIndex(null);
      
      const indexes = await masterContract.getIndexes();
      setUserNextIndex(indexes.userNextIndex);
      
      await sleep(5000);
      await getIndexes(); 
    }
  }, [masterContract]);

  return {
    userNextIndex: userNextIndex,
    address: masterContract?.address.toString(),
    // sendIncrement: () => {
    //   return masterContract?.sendIncrement(sender);
    // },
  };
}