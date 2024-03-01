import React from "react";
import Avatar from "@mui/material/Avatar";

interface Props {
    height?: string;
    width?: string;
    fontSize?: string;
    src?: string
    className?: string
}

const UserAvatar = ({height="70px", width="70px", fontSize="48px", src="/unicorn-low.gif", className=""}: Props)=>{
    return (
        <Avatar className={className} src={src} alt="Avatar" sx={{height, width, fontSize}}/>
        // <div className="rounded-full text-center flex justify-center items-center"
        //      style={{backgroundColor: "#000",height, width, fontSize}}>
        //     <div>🦄</div>
        // </div>
    )
}

export default UserAvatar;
