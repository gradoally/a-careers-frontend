export interface OrderArgs {
  id: string;
}

export interface OrderRequest {
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

export interface Order {
  id: string;
  title: string;
  price: number;
  contract_address: string;
  description: string;
  technicalTask: {
    link: string;
    name: string;
  };
  date: {
    createdAt: string;
    deadline: string;
  };
  category: string;
  customerAddress: string; // account
  freelancerAddress: string | null; // account
  status: number;
  count_responses: number;
}
