import Box from "@mui/material/Box";

import {PropsWithChildren} from "react";

const HoverOpacityComponent = ({children}: PropsWithChildren)=>{
    return (
        <Box component="div"
            sx={{
                "&:hover": {
                    "& .hover-opacity": {
                        "opacity": "100%",
                    }
                }
            }}>{children}</Box>
    )
}

export default HoverOpacityComponent;