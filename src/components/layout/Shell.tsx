import React, {ReactNode} from "react";


import Paper from "@mui/material/Paper";

import {StyledBox} from "./styled";
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
    const paddingTop = props.miniAppbar ? "60px" : "70px";
    return (
        <Paper elevation={0} className="max-w-screen h-full min-h-screen" sx={{width: "375px", margin: "0 auto"}}>
            {props.header && props.header}
            {props.withDrawer && <Drawer withAuth={props.withAuth}/>}
            <div
                id="styled-content"
                className="min-h-screen h-full overflow-y-scroll"
                style={{paddingTop: paddingTop, paddingBottom: "100px", }}
            >
                {props.children}
            </div>
            {props.extra && props.extra}
            {props.footer && props.footer}
        </Paper>
    )
}

export default Shell;
