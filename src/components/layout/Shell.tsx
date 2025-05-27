import React, {ReactNode} from "react";


import Paper from "@mui/material/Paper";

import {StyledBox} from "./styled";
import Drawer from "@/components/layout/drawer";

interface Props {
    children: ReactNode;
    header?: ReactNode;
    withDrawer?: boolean;
    extra?: ReactNode;
    footer?: ReactNode;
    contentClassName?:string;
}

const Shell = (props: Props) => {
    return (
        <div
            className="flex flex-col justify-center min-h-screen h-full w-screen min-w-[300px] overflow-x-scroll"
        >
            {props.header && props.header}
            {props.withDrawer && <Drawer/>}
            {props.extra && props.extra}
            <div
                id="styled-content"
                className={`h-full overflow-y-scroll w-full max-w-[768px] mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-[20px] ${props.contentClassName}`}
            >
                {props.children}
            </div>
            {props.footer && props.footer}
        </div>
    )
}

export default Shell;
