import React from "react";

import Stack from '@mui/material/Stack';

interface Props extends React.PropsWithChildren {
    transparent?: boolean;
    padding?: string;
    className?: string;
}

export default function Footer({ padding = "30px 0px", ...props }: Props) {
    return (
        <footer id="footer" className={`w-full text-center ${props.className}`}
            style={{
                padding: padding,
                borderTop: !props.transparent ? "1px solid rgba(217, 217, 217, 0.2)" : "none",
            }}
        >
            <Stack spacing="15px" justifyContent={"center"} alignItems="center" component="div"
                style={{
                    padding: "0 20px",
                    margin: "0 auto",
                    maxWidth: "768px",
                    width: "100%",
                    background: props.transparent ? "transparent" : "linear-gradient(180deg, rgba(0, 0, 21, 0.77) 0%, #000015 100%)",
                }}>
                {props.children}
            </Stack>
        </footer>
    )
}
