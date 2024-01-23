import { onBack } from "../../../lib";

export const Close = () => {
  return (
    <svg
      onClick={onBack}
      style={{ cursor: "pointer" }}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect width="30" height="30" rx="15" fill="#3A4362" />
      <rect
        x="19.9502"
        y="8.63574"
        width="2"
        height="16"
        rx="1"
        transform="rotate(45 19.9502 8.63574)"
        fill="#000015"
      />
      <rect
        x="8.63574"
        y="10.0508"
        width="2"
        height="16"
        rx="1"
        transform="rotate(-45 8.63574 10.0508)"
        fill="#000015"
      />
    </svg>
  );
};
