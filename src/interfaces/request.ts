import { IUser } from ".";

export interface IUserRes {
    found: boolean;
    data: IUser | null;
}