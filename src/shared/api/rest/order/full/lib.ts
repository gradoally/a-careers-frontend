import { Order, OrderRequest } from "./type";

export const transformOrderData = (order: OrderRequest): Order => {
  return {
    id: order.index.toString(),
    title: order.name,
    price: order.price,
    contract_address: order.address,
    description: order.description,
    technicalTask: {
      link: order.technicalTask,
      name: getNameFromLink(order.technicalTask),
    },
    date: {
      createdAt: order.createdAt,
      deadline: order.deadline,
    },
    category: order.category,
    customerAddress: order.customerAddress,
    freelancerAddress: order.customerAddress,
    status: order.status,
    count_responses: order.responsesCount,
  };
};

const getNameFromLink = (urlString: string) => {
  const parts = urlString.split("/");
  const fileName = parts[parts.length - 1];
  return fileName;
};
