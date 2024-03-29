import { Order } from "@/openapi/client";

type Click = () => void;

interface IClicks {
  [key: number]: Click;
}

export interface IButtonWrapperProps {
  order: Order;
  clicks?: IClicks;
}

export interface IButtonProps {
  title?: string;
  click?: Click;
}

export interface ISendFeedbackButtonProps extends IButtonProps {
  index: number;
}
