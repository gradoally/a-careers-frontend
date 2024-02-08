import React,{ ReactNode } from "react";


import Paper from "@mui/material/Paper";

import { StyledBox } from "./styled";

interface Props {
    children: ReactNode;
    header?: ReactNode;
    drawer?: ReactNode;
    extra?: ReactNode;
    footer?: ReactNode;
    miniAppbar?: boolean;
}
const Shell = (props: Props) => {
    return (
            <Paper sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "100vw",
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                "& > #styled-content": { flexGrow: "1" },
            }}>
                {props.header && props.header}
                {props.drawer && props.drawer}
                <StyledBox id="styled-content" sx={{paddingTop: props.miniAppbar?"60px":"70px"}}>
                    {props.children}
                </StyledBox>
                {props.extra && props.extra}
                {props.footer && props.footer}
            </Paper>
    )
}

export default Shell;
