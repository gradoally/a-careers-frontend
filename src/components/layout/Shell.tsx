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
    padding?: string;
}

const Shell = ({padding = "60px 0 100px 0", ...props}: Props) => {
    return (
        <Paper elevation={0} className="max-w-screen h-full w-full min-h-screen border border-divider"
               sx={{maxWidth: "375px", margin: "0 auto"}}
        >
            {props.header && props.header}
            {props.withDrawer && <Drawer withAuth={props.withAuth}/>}
            {props.extra && props.extra}
            <div
                id="styled-content"
                className="min-h-screen h-full overflow-y-scroll"
                style={{padding: padding}}
            >
                {props.children}
                {props.footer && props.footer}
            </div>
        </Paper>
    )
}

export default Shell;
