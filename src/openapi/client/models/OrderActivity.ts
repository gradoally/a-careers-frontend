/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OpCode } from './OpCode';
import type { Order } from './Order';
import type { OrderActivitySenderRole } from './OrderActivitySenderRole';
import type { User } from './User';

export type OrderActivity = {
    id?: number;
    orderId?: number;
    order?: Order;
    txLt?: number;
    txHash?: string;
    timestamp?: string;
    opCode?: OpCode;
    senderRole?: OrderActivitySenderRole;
    /**
     * Message sender address: for customer or freelancer - in non-bounceable form, for others - in bounceable form.
     */
    senderAddress?: string;
    sender?: User;
    amount?: number | null;
};

