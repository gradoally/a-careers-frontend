/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderStatus } from "./OrderStatus";
import type { User } from "./User";
import type { UserResponse } from "./UserResponse";

export type Order = {
  index?: number;
  /**
   * Smartcontract address - in bounceable form.
   */
  address?: string;
  status?: OrderStatus;
  /**
   * User wallet address - in non-bounceable form.
   */
  customerAddress?: string;
  customer?: User;
  /**
   * User wallet address - in non-bounceable form.
   */
  freelancerAddress?: string | null;
  freelancer?: User;
  createdAt?: string;
  responsesCount?: number;
  category?: string | null;
  language?: string | null;
  name?: string | null;
  price?: number;
  deadline?: string;
  description?: string | null;
  technicalTask?: string | null;
  nameTranslated?: string | null;
  descriptionTranslated?: string | null;
  technicalTaskTranslated?: string | null;
  currentUserResponse?: UserResponse;
};
