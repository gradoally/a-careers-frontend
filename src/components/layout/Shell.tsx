import React,{ ReactNode } from "react";


import Paper from "@mui/material/Paper";

import { StyledBox } from "./styled";
import Drawer from "@/components/layout/drawer";

interface Props {
    children: ReactNode;
    header?: ReactNode;
    withDrawer?: boolean;
    withAuth?: boolean;
    extra?: ReactNode;
    footer?: ReactNode;
    miniAppbar?: boolean;
}
const Shell = (props: Props) => {
    const paddingTop = props.miniAppbar?"60px":"70px";
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
                {props.withDrawer &&  <Drawer withAuth={props.withAuth}/>}
                <div
                    id="styled-content"
                    // style={{
                        // paddingTop,
                        // minHeight: `calc(100vh - ${paddingTop} - 40px)`,
                // }}
                    className="w-full overflow-y-scroll "
                >
                    {props.children}
                </div>
                {props.extra && props.extra}
                {props.footer && props.footer}
            </Paper>
    )
}

export default Shell;
