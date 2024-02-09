import React from "react";

const CenteredContainer = ({children}: React.PropsWithChildren)=>{
    return (
        <div className="w-full h-full flex justify-center items-center">
            {children}
        </div>
    )
}

export default CenteredContainer;
