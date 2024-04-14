import { ReactNode } from "react";
import { StyledAppBar, StyledPaper, StyledToolbar } from "./styled";
import { SxProps } from "@mui/system";

interface Props {
    height?: string
    padding?: string
    sx?: SxProps;
    children: ReactNode
}

const AppBar = ({ children, height = "70px", padding = "20px", sx }: Props) => {
    return (
        <StyledAppBar sx={{ height: height, ...sx }}>
            <StyledPaper>
                <StyledToolbar sx={{ height: height, padding: `${padding} !important` }}>
                    {children}
                </StyledToolbar>
            </StyledPaper>
        </StyledAppBar>
    )
}


export default AppBar;
