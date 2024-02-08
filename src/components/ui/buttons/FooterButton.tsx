import {ReactNode} from "react";

import Button, {ButtonProps} from '@mui/material/Button';

interface Props extends ButtonProps {
    to?: string;
}

const FooterButton = ({children,...props}: Props) => {
    return (
        <Button color={"secondary"}
                variant="contained"
                sx={{
                    color: "common.black",
                    width: "100%",
                    height: "40px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    textAlign: "center",
                    fontWeight: "800",
                }}
            {...props}
        >
            {children}
        </Button>
    )
}

export default FooterButton;