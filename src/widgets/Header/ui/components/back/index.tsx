import { onBack } from "../../../lib";
import s from "./style.module.scss";

interface HeaderBackProps {
  title: string;
}

export const HeaderBack = ({ title }: HeaderBackProps) => {
  return (
    <button onClick={onBack} className={s.back}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <rect width="30" height="30" rx="15" fill="#3A4362" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.6667 19.9401C21.6279 17.6972 19.8175 16.4246 18.235 16.1219C16.6529 15.8196 15.1467 15.7738 13.7158 15.9849V20.0017L7 13.4472L13.7158 7.23438V11.0522C16.3612 11.0709 18.61 11.9264 20.4625 13.618C22.3146 15.3097 23.3829 17.417 23.6667 19.9401Z"
          fill="#000015"
          stroke="#000015"
          stroke-width="1.66667"
          stroke-linejoin="round"
        />
      </svg>

      <p>{title}</p>
    </button>
  );
};
