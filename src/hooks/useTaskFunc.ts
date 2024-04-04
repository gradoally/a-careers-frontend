import { useMemo } from "react";
import { IUser } from "@/interfaces";
import { Order } from "@/openapi/client";

export interface ITaskMetaInfo {
  isCustomer: boolean;
  isResponses: boolean;
  isResponded: boolean;
  isHired: boolean;
  isWorkStarted: boolean;
  isProfile: {
    customer: boolean;
    freelancer: boolean;
  };
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

  const isHired = useMemo(() => {
    if (isCustomer || task?.freelancer === undefined) return false;
    return task?.freelancer?.index === user?.index ? true : false;
  }, [user, task, isCustomer]);

  const isWorkStarted = useMemo(() => {
    if (task?.status === undefined) return false;
    return task.status > 2 ? true : false;
  }, [task]);

  const statusCode = useMemo(() => {
    if (isCustomer) {
      /*CUSTOMER*/
      if (task?.status === 1 && isResponses) return 20;
    } else {
      /**FREELANCER */
      if (task?.status === 1) {
        if (isResponded) return 21;
        if (isResponses) return 20;
        return 1;
      }
      //If someone else received offer
      if (isResponded && !isHired) return 22;
    }
    return task?.status !== undefined ? task.status : -1;
  }, [task, isCustomer, isResponses, isResponded, isHired]);

  const isProfile = useMemo(() => {
    return {
      customer: !isCustomer && task?.customer ? true : false,
      freelancer: isCustomer && task?.freelancer ? true : false,
    };
  }, [task, isCustomer]);

  return {
    isCustomer,
    isResponses,
    isResponded,
    isWorkStarted,
    isHired,
    statusCode,
    isProfile,
  };
}
