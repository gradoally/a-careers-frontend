import { Input } from "@/shared/ui/input";
import { Event, Store } from "effector";
import { useStore } from "effector-react";
import { ColumnContent } from "../..";

// import s from './style.module.scss'

interface FieldProps {
  $store: Store<string>;
  inputed?: Event<string>;
  title: string;
  isDisabled?: boolean;
}

export const Field = ({ $store, inputed, title, isDisabled }: FieldProps) => {
  const value = useStore($store);

  return (
    <ColumnContent title={title}>
      <Input
        disabled={isDisabled}
        theme="primary"
        value={value}
        onChange={(event) => inputed?.(event.target.value)}
      />
    </ColumnContent>
  );
};
