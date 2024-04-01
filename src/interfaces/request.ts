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