import { FeedOrder, FeedOrderRequest } from "./type";

export const transformOrderData = (order: FeedOrderRequest): FeedOrder => {
  return {
    id: order.index,
    title: order.name,
    date: {
      deadline: order.deadline,
      createdAt: order.createdAt,
    },
    price: order.price,
    count_response: order.responsesCount,
  };
};
