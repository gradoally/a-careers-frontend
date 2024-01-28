import {
  categoriesVariantFeed,
  filterToggleValue,
  languagesVarinatstFeed,
} from "@/entities/orders";

export interface FeedOrderRequest {
  index: number;
  address: string;
  status: number;
  customerAddress: string;
  freelancerAddress: string;
  createdAt: string;
  responsesCount: number;
  category: string;
  language: string;
  name: string;
  price: number;
  deadline: string;
  description: string;
  technicalTask: string;
}

export interface FeedOrder {
  id: number;
  title: string;
  date: {
    createdAt: string;
    deadline: string;
  };
  price: number;
  count_response: number;
}

export interface getFeedOrdersArgs {
  query: string;
  page: number;
  category: categoriesVariantFeed;
  language: languagesVarinatstFeed;
  fromPrice: string;
  orderBy: filterToggleValue;
}
