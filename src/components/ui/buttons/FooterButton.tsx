import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
    to?: string;
}

export default function FooterButton({ children, ...props }: Props) {
    return (
        <Button
            color={"secondary"}
            variant="contained"
            sx={{
                width: "100%",
                color: "common.black",
                height: "40px",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "16px",
                lineHeight: "24px",
                textTransform: "none",
                fontFamily: "SFProBold",
                "&.Mui-disabled": {
                    "backgroundColor": "rgb(69, 174, 245,0.4)"
                }
            }}
            {...props}
        >
            {children}
        </Button>
    )
}

export function FooterButton2({ children, ...props }: Props) {
    return (
        <Button
            color={"secondary"}
            variant="contained"
            sx={{
                width: "100%",
                color: "rgb(69, 174, 245)",
                background: "transparent",
                height: "40px",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "12px",
                lineHeight: "24px",
                textTransform: "none",
                fontFamily: "SFProRegular",
                fontWeight: 500,
                border: "1px solid #45AEF5",
                "&.Mui-disabled": {
                    "backgroundColor": "rgb(69, 174, 245,0.4)"
                }
            }}
            {...props}
        >
            {children}
        </Button>
    )
}
