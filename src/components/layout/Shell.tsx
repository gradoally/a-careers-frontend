import React,{ ReactNode } from "react";


import Paper from "@mui/material/Paper";

import { StyledBox } from "./styled";
import Drawer from "@/components/layout/drawer";

interface Props {
    children: ReactNode;
    header?: ReactNode;
    withDrawer?: boolean;
    extra?: ReactNode;
    footer?: ReactNode;
    miniAppbar?: boolean;
}
const Shell = (props: Props) => {
    return (
            <Paper elevation={0} sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "100vw",
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                "& > #styled-content": { flexGrow: "1"},
            }}>
                {props.header && props.header}
                {props.withDrawer &&  <Drawer/>}
                <StyledBox id="styled-content" sx={{paddingTop: props.miniAppbar?"80px":"90px"}}>
                    {props.children}
                </StyledBox>

                {props.extra && props.extra}
                {props.footer && props.footer}
            </Paper>
    )
}

export default Shell;
