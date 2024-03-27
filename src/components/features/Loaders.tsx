import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import Image from "@/components/Image";

export function CircularLoading(props: { className?: string; color?: "info" }) {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <CircularProgress
                className={props.className}
                color={props.color || "secondary"}
            />
        </div>
    );
}

export function Loader(props: { className?: string }) {
    return <div className={`bg-primary w-full h-full flex justify-center items-center ${props?.className}`}>
        <Image alt={"Alfamater auth loader"} src="/gifs/unicorn-low.gif"
            width={"100"} height={"100"} />
    </div>
}