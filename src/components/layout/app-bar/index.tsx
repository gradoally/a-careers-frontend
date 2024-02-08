import {PropsWithChildren} from "react";
import {StyledAppBar, StyledPaper, StyledToolbar} from "./styled";


const AppBar = ({children}: PropsWithChildren) => {
    return (
        <StyledAppBar>
            <StyledPaper>
                <StyledToolbar>
                    {children}
                </StyledToolbar>
            </StyledPaper>
        </StyledAppBar>
    )
}

export const MiniAppbar = ({children}: PropsWithChildren) => {
    return (

        <StyledAppBar>
            <StyledPaper>
                <StyledToolbar sx={{height: "60px", padding: "15px"}}>
                    {children}
                </StyledToolbar>
            </StyledPaper>
        </StyledAppBar>
    )
}

export default AppBar;