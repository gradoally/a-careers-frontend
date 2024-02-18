
import React from "react";

interface Props {
    height?: string;
    width?: string;
    fontSize?: string;
}

const UserAvatar = ({height="70px", width="70px", fontSize="48px"}: Props)=>{
    return (
        <div className="rounded-full text-center flex justify-center items-center"
             style={{backgroundColor: "#000",height, width, fontSize}}>
            <div>🦄</div>
        </div>
    )
}

export default UserAvatar;