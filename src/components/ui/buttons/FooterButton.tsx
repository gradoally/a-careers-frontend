import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
    to?: string;
}

export default function FooterButton({ children, ...props }: Props) {
    return (
        <Button color={"secondary"}
            variant="contained"
            sx={{
                color: "common.black",
                // width: "100%",
                height: "40px",
                borderRadius: "5px",
                fontSize: "16px",
                textAlign: "center",
                fontWeight: "800",
                width: "100%",
                lineHeight: "24px",
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
