import {ReactNode} from "react";
import clsx from "clsx";

interface Props {
    className?: string
    children: ReactNode
}


const CenteredContainer = ({children, className=""}: Props)=>{
    return (
        <div className={
            clsx("w-full h-full flex justify-center items-center", className)
        }>
            {children}
        </div>
    )
}

export default CenteredContainer;
