type Click = () => void;

interface IButton {
  title?: string;
  click?: Click;
}

export interface IButtonProps extends IButton {
  comissionText?: string;
}

/**FREELANCER BUTTONS INTERFACES*/
export interface IMultipleButtonProps {
  button1: IButton;
  button2: IButton;
  comissionText?: string;
}
