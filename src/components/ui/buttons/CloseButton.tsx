
import SvgIcon from "@mui/material/SvgIcon";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

interface Props extends IconButtonProps {
    to?: string
}

const CloseButton = ({ children, ...props }: Props) => {
    return (
        <IconButton
            aria-label="back"
            className="h-[30px] w-[30px] p-0"
            {...props}
        >
            <SvgIcon sx={{ fontSize: "30px" }} className="h-[30px] w-[30px] text-[30px]">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="#3A4362" />
                    <rect x="19.9502" y="8.63574" width="2" height="16" rx="1" transform="rotate(45 19.9502 8.63574)"
                        fill="#000015" />
                    <rect x="8.63574" y="10.0508" width="2" height="16" rx="1" transform="rotate(-45 8.63574 10.0508)"
                        fill="#000015" />
                </svg>
            </SvgIcon>
        </IconButton>
    )
}

export default CloseButton;
