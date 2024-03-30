import { IUser } from ".";

export interface IUserRes {
    found: boolean;
    data: IUser | null;
}

export interface IUserStats {
    "asCustomerTotal": number,
    "asCustomerByStatus": {
        [key: string]: number,
    },
    "asFreelancerTotal": number,
    "asFreelancerByStatus": {
        [key: string]: number,
    }
}