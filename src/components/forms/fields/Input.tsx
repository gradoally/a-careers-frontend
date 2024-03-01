import MuiInput, {InputProps} from "@mui/material/Input";
import React from "react";
import Divider from "@/components/ui/Divider";

export const Input = ({disableUnderline, ...props}: InputProps) => {
    return (
        <React.Fragment>
            <MuiInput
                {...props}
                disableUnderline={true}
            />
            {!disableUnderline && <Divider className="hover-opacity transition-opacity"/>}
        </React.Fragment>
    )
}

export default Input;