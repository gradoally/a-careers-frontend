import {ReactNode} from "react";
import {StyledAppBar, StyledPaper, StyledToolbar} from "./styled";


interface Props {
    height?: string
    padding?: string
    children: ReactNode
}

const AppBar = ({children, height="60px", padding="15px"}: Props) => {
    return (
        <StyledAppBar sx={{height: height}}>
            <StyledPaper>
                <StyledToolbar sx={{height: height, padding: padding}}>
                    {children}
                </StyledToolbar>
            </StyledPaper>
        </StyledAppBar>
    )
}


export default AppBar;
