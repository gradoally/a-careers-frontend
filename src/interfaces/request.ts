import { IUser } from ".";

export interface IContent<T> {
  loading: boolean;
  status: string;
  content: T;
}

export interface IUserRes {
  found: boolean;
  data: IUser | null;
}

export interface IUserStats {
  asCustomerTotal: number;
  asCustomerByStatus: {
    [key: string]: number;
  };
  asFreelancerTotal: number;
  asFreelancerByStatus: {
    [key: string]: number;
  };
}

export interface IUserStats2 {
  asCustomerByStatus: {
    onModeration: number;
    noResponses: number;
    haveResponses: number;
    offerMade: number;
    inTheWork: number;
    pendingPayment: number;
    arbitration: number;
    completed: number;
  };
  asFreelancerByStatus: {
    responseSent: number;
    responseDenied: number;
    anOfferCameIn: number;
    inTheWork: number;
    onInspection: number;
    arbitration: number;
    terminated: number;
    completedTotal: number;
    failedTotal: number;
  };
}
