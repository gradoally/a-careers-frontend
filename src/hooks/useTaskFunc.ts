import { useMemo } from "react";
import { IUser } from "@/interfaces";
import { Order } from "@/openapi/client";

export interface ITaskMetaInfo {
  isCustomer: boolean;
  isResponses: boolean;
  isResponded: boolean;
  statusCode: number;
}

export default function useTaskMetaInfo(
  task: Order | null,
  user?: IUser | undefined | null
): ITaskMetaInfo {
  const isCustomer = useMemo(() => {
    return user?.index === task?.customer?.index;
  }, [task, user]);

  const isResponses = useMemo(() => {
    return task?.status === 1 && task?.responsesCount ? true : false;
  }, [task]);

  const isResponded = useMemo(() => {
    if (isCustomer || !user?.userAddress) return false;
    return task?.currentUserResponse?.freelancerAddress === user?.userAddress
      ? true
      : false;
  }, [task, isCustomer, user]);

  const statusCode = useMemo(() => {
    console.log(isResponded, isResponses);
    if (task?.status === 1) {
      if (isResponded) return 21;
      if (isResponses) return 20;
      return 1;
    } else {
      return task?.status || -1;
    }
  }, [task, isResponses, isResponded]);

  return {
    isCustomer,
    isResponses,
    isResponded,
    statusCode,
  };
}
