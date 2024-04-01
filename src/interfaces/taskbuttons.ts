import { Order, UserResponse } from "@/openapi/client";

type Click = () => void;

interface IClicks {
  [key: number]: Click;
}

export interface IButtonWrapperProps {
  order: Order;
  statusCode: number;
  response?: UserResponse;
  clicks?: IClicks;
}

export interface IButtonProps {
  title?: string;
  comissionText?: string;
  click?: Click;
}

export interface ISendFeedbackButtonProps extends IButtonProps {
  index: number;
}
