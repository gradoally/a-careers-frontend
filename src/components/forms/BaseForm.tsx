"use client"

import React, {ReactNode} from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
    children: ReactNode;
    onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
    loading?: boolean
    noValidate?: boolean
}

const BaseForm = ({children, onSubmit, loading, noValidate}: Props)=>{
    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={!!loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <form onSubmit={onSubmit} noValidate={noValidate}>
                {children}
            </form>
        </div>
    )
}

export default BaseForm;