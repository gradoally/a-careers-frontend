import { IUser } from "@/interfaces";

export type UserResponse = {
  id: number;
  freelancerAddress: string;
  freelancer: IUser | null;
  text: string;
  price: number;
  deadline: string;
};
