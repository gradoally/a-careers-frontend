import Box from '@mui/material/Box';
import {ReactNode} from "react";

interface Props {
    children: ReactNode,
    transparent?: boolean
    grow?: boolean
}

const Footer = ({grow=true,...props}: Props) => {
    const styled = {
        borderTop: "1px solid rgba(217, 217, 217, 0.2)",
        background: "linear-gradient(180deg, rgba(0, 0, 21, 0.77) 0%, #000015 100%)",
        width: '100%',
        padding: 2,
        minHeight: "100px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
    return (
        <div>
            <Box component="div" sx={styled}/>
            <Box
                component="footer" sx={{
                ...styled,
                position: 'fixed',
                bottom: 0,
                left: 0,
                borderTop: props.transparent ? "none" : "1px solid rgba(217, 217, 217, 0.2)",
                background: props.transparent ? "transparent" : "linear-gradient(180deg, rgba(0, 0, 21, 0.77) 0%, #000015 100%)",
            }}>
                    {props.children}
            </Box>
        </div>
    )
}

export default Footer;
